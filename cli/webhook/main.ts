import { Server } from '../.tsc/TypeSharp/System/Server';
import { Session } from '../.tsc/TidyHPC/Routers/Urls/Session';
import { args, cmd, cmdAsync, copyDirectory } from '../.tsc/context';
import { Path } from '../.tsc/System/IO/Path';
import { File } from '../.tsc/System/IO/File';
import { Directory } from '../.tsc/System/IO/Directory';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { Regex } from '../.tsc/System/Text/RegularExpressions/Regex';
import { Environment } from '../.tsc/System/Environment';

let utf8 = new UTF8Encoding(false);
let staticPath = Path.Combine(Path.GetTempPath(), "webhook-react-deploy");

let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(`Parameters: ${parameters}`);
let port = parameters.port ?? "8080";
let gitSecret = parameters.git ?? "";
let nugetSecret = parameters.nuget ?? "";

let isNodeJs = (tempDirectory: string) => {
    // 判断是否存在package.json
    let packageJsonPath = Path.Combine(tempDirectory, "package.json");
    if (!Path.Exists(packageJsonPath)) {
        console.log(`No package.json, the project is not a nodejs project`);
        return false;
    }
    let packageJson = Json.Load(packageJsonPath);
    if (packageJson.scripts && packageJson.scripts.build) {
        console.log(`Found build script`);
        return true;
    }
    else {
        console.log(`No build script`);
        return false;
    }
};

let buildNodeJs = async (tempDirectory: string, repo: string) => {
    // 设置镜像源
    // npm config set registry https://mirrors.cloud.tencent.com/npm/
    console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/`);
    if (await cmdAsync(tempDirectory, `npm config set registry https://mirrors.cloud.tencent.com/npm/`) != 0) {
        console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/ failed`);
        Directory.Delete(tempDirectory, true);
        return;
    }
    // 下一步，使用npm install安装依赖
    console.log(`npm install`);
    if (await cmdAsync(tempDirectory, `npm install`) != 0) {
        console.log(`npm install failed, delete temp directory: ${tempDirectory}`);
        Directory.Delete(tempDirectory, true);
        return;
    }
    // 在.env文件中设置PUBLIC_URL为/repo
    console.log(`Set PUBLIC_URL=/${repo}`);
    let envFile = Path.Combine(tempDirectory, ".env");
    let envContent = `PUBLIC_URL=/${repo}
GENERATE_SOURCEMAP=false`;
    File.WriteAllText(envFile, envContent, utf8);

    // 下一步，使用npm run build打包
    console.log(`npm run build`);
    if (await cmdAsync(tempDirectory, `npm run build`) != 0) {
        console.log(`npm run build failed, delete temp directory: ${tempDirectory}`);
        Directory.Delete(tempDirectory, true);
        return;
    }
    // 下一步，将打包后的文件复制到指定目录
    let destDirectory = Path.Combine(staticPath, repo);
    console.log(`Copy to ${destDirectory}`);
    if (Directory.Exists(destDirectory)) {
        Directory.Delete(destDirectory, true);
    }
    copyDirectory(Path.Combine(tempDirectory, "build"), destDirectory);
    console.log(`Deploy success`);
};

let isDotNet = (tempDirectory: string) => {
    // 判断是否存在.csproj文件
    let csprojFiles = Directory.GetFiles(tempDirectory, "*.csproj");
    if (csprojFiles.length == 0) {
        console.log(`No .csproj file, the project is not a .NET project`);
        return false;
    }
    console.log(`Found .csproj file`);
    return true;
};

let regex_GeneratePackageOnBuild = new Regex("<GeneratePackageOnBuild>\\s*(true|True)\\s*</GeneratePackageOnBuild>");
let isNuget = (csprojPath: string) => {
    let csprojContent = File.ReadAllText(csprojPath, utf8);
    if (regex_GeneratePackageOnBuild.IsMatch(csprojContent)) {
        console.log(`Found <GeneratePackageOnBuild>true</GeneratePackageOnBuild> in ${csprojPath}`);
        return true;
    }
    console.log(`No <GeneratePackageOnBuild>true</GeneratePackageOnBuild> found in any .csproj file`);
    return false;
};

let regex_Version = new Regex("<Version>\\s*(\\d+\\.\\d+\\.\\d+)\\s*</Version>");

let getCurrentNugetVersion = async (csprojPath: string) => {
    let csprojContent = File.ReadAllText(csprojPath, utf8);
    let match = regex_Version.Match(csprojContent);
    if (match.Success) {
        return match.Groups[1].Value;
    }
    return "";
};

let buildNugetPackage = async (csprojPath: string) => {
    let currentDirectory = Path.GetDirectoryName(csprojPath);
    let version = await getCurrentNugetVersion(csprojPath);
    let nugetPackagePath = Path.Combine(currentDirectory, `bin/Release/${version}`);
    if (Directory.Exists(nugetPackagePath)) {
        Directory.Delete(nugetPackagePath, true);
    }
    console.log(`dotnet pack -c Release -o ${nugetPackagePath}`);
    if (await cmdAsync(currentDirectory, `dotnet pack -c Release -o ${nugetPackagePath}`) != 0) {
        console.log(`dotnet pack failed, delete nuget package directory: ${nugetPackagePath}`);
        if (Directory.Exists(nugetPackagePath)) {
            Directory.Delete(nugetPackagePath, true);
        }
        return "";
    }
    return nugetPackagePath;
};

let publishCsproj = async (csprojPath: string) => {
    let currentDirectory = Path.GetDirectoryName(csprojPath);
    console.log(`dotnet publish -c Release`);
    if (await cmdAsync(currentDirectory, `dotnet publish -c Release`) != 0) {
        console.log(`dotnet publish failed`);
        return false;
    }
    return true;
};
// 
let uploadNugetPackage = async (nugetPackagePath: string) => {
    // 通过dotnet上传nuget包
    let cmd = `dotnet nuget push ${Path.GetFileName(nugetPackagePath)} --api-key ${nugetSecret} --source https://api.nuget.org/v3/index.json`;
    console.log(cmd);
    if (await cmdAsync(Path.GetDirectoryName(nugetPackagePath), cmd) != 0) {
        console.log(`dotnet nuget push failed`);
        return false;
    }
    return true;
};

let gitClone = async (tempDirectory: string, cloneUrl: string, commit: string) => {
    if (gitSecret != "") {
        // 下一步，将secret添加到cloneUrl中
        //https://username:your_token@github.com/username/repo.git
        let index = cloneUrl.indexOf("//");
        cloneUrl = cloneUrl.substring(0, index + 2) + gitSecret + "@" + cloneUrl.substring(index + 2);
    }
    // 下一步，使用cloneUrl和commit下载代码
    console.log(`Create temp directory: ${tempDirectory}`);
    if (Directory.Exists(tempDirectory) == false) {
        Directory.CreateDirectory(tempDirectory);
    }
    console.log(`Working Directory : ${tempDirectory}, Existing: ${Directory.Exists(tempDirectory)}`);
    console.log(`git clone ${cloneUrl} .`);
    if (await cmdAsync(tempDirectory, `git clone ${cloneUrl} .`) != 0) {
        console.log(`git clone ${cloneUrl} failed, delete temp directory: ${tempDirectory}`);
        Directory.Delete(tempDirectory, true);
        return;
    }
    if (commit != "") {
        console.log(`git checkout ${commit}`);
        if (await cmdAsync(tempDirectory, `git checkout ${commit}`) != 0) {
            console.log(`git checkout ${commit} failed, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
    }
};

let main = async () => {
    let server = new Server();

    server.useStatic(staticPath);
    console.log(`Static Path: ${staticPath}`);
    server.use("/api/v1/webhook", async (session: Session) => {
        let data = await session.Cache.GetRequstBodyJson();
        if (data.ref != "refs/heads/main") {
            console.log(`Skip: ${data.ref}`);
            return;
        }
        //https://github.com/Cangjier/type-sharp.git
        let cloneUrl = data.repository.clone_url;
        let commit = data.head_commit.id;
        let repo = data.repository.name;
        let tempDirectory = Path.Combine(Path.GetTempPath(), commit);
        gitClone(tempDirectory, cloneUrl, commit);
        if (isNodeJs(tempDirectory)) {
            await buildNodeJs(tempDirectory, repo);
        }
        if (Directory.Exists(tempDirectory)) {
            Directory.Delete(tempDirectory, true);
            console.log(`Delete temp directory: ${tempDirectory}`);
        }
    });
    await server.start(Number(port));
};

// await main();

let test1 = async (cloneUrl: string, commit: string) => {
    let tempDirectory = Path.Combine(Path.GetTempPath(), commit);
    await gitClone(tempDirectory, cloneUrl, commit);
    if (isDotNet(tempDirectory) == false) {
        console.log(`Not a .NET project`);
        return;
    }
    let csprojFiles = Directory.GetFiles(tempDirectory, "*.csproj");
    if (csprojFiles.length != 1) {
        console.log(`More than one .csproj file found or no .csproj file found`);
        return;
    }
    let csprojPath = csprojFiles[0];
    if (await publishCsproj(csprojPath) == false) {
        console.log(`Publish failed`);
        return;
    }
    if (isNuget(csprojPath) == false) {
        console.log(`Not a Nuget project`);
        return;
    }
    let nugetPackagePath = await buildNugetPackage(csprojPath);
    if (File.Exists(nugetPackagePath) == false) {
        console.log(`Nuget package not found`);
        return;
    }
    if (await uploadNugetPackage(nugetPackagePath) == false) {
        console.log(`Upload nuget package failed`);
        return;
    }

};

await test1("https://github.com/Cangjier/tidy-hpc.git", "");