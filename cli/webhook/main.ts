import { Server } from '../.tsc/Cangjie/TypeSharp/System/Server';
import { Session } from '../.tsc/TidyHPC/Routers/Urls/Session';
import { args, axios, script_path } from '../.tsc/Context';
import { cmd, cmdAsync, copyDirectory, deleteDirectory, execAsync, } from "../.tsc/staticContext";
import { Path } from '../.tsc/System/IO/Path';
import { File } from '../.tsc/System/IO/File';
import { Directory } from '../.tsc/System/IO/Directory';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { Regex } from '../.tsc/System/Text/RegularExpressions/Regex';
import { Environment } from '../.tsc/System/Environment';
import { Guid } from '../.tsc/System/Guid';
import { Xml } from '../.tsc/TidyHPC/LiteXml/Xml';
import { zip } from '../.tsc/Cangjie/TypeSharp/System/zip';
import { Version } from '../.tsc/System/Version';
import { Task } from '../.tsc/System/Threading/Tasks/Task';
import { DateTime } from '../.tsc/System/DateTime';

let utf8 = new UTF8Encoding(false);

let homeDirectory = Environment.GetEnvironmentVariable("HOME") ?? Path.GetTempPath();
let webhookDirectory = Path.Combine(homeDirectory, ".webhook");
if (Directory.Exists(webhookDirectory) == false) {
    Directory.CreateDirectory(webhookDirectory);
}

let staticFrontPath = Path.Combine(webhookDirectory, "front");
if (Directory.Exists(staticFrontPath) == false) {
    Directory.CreateDirectory(staticFrontPath);
}
let staticEndPath = Path.Combine(webhookDirectory, "end");
if (Directory.Exists(staticEndPath) == false) {
    Directory.CreateDirectory(staticEndPath);
}

let homeTempDirectory = Path.Combine(homeDirectory, "tmp");
if (Directory.Exists(homeTempDirectory) == false) {
    Directory.CreateDirectory(homeTempDirectory);
}

let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        if (i + 1 < args.length) {
            let value = args[i + 1];
            parameters[key] = value;
            i++;
        }
        else {
            parameters[key] = "true";
        }
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(`parameters: ${parameters}`);
let help = () => {
    console.log(File.ReadAllText(Path.Combine(Path.GetDirectoryName(script_path), "README.md"), utf8));
};
let port = parameters.port ?? "8080";
let gitTokens = parameters.git ?? "";
let nugetSecret = parameters.nuget ?? "";
let branches = (parameters.branch ?? "master,main").split(',');

let Util = () => {
    let getSystemName = async () => {
        // 判断是linux-x64还是linux-arm64
        let result = await cmdAsync(Environment.CurrentDirectory, "uname -m");
        if (result.output == undefined) {
            return "";
        }
        let arch = result.output;
        if (arch.includes("aarch64")) {
            return "linux-arm64";
        }
        else if (arch.includes("x86_64")) {
            return "linux-x64";
        }
        return "";
    };
    let printEnv = async () => {
        let result = await cmdAsync(Environment.CurrentDirectory, "env");
        console.log(`env: ${result.output}`);
    };
    return {
        getSystemName,
        printEnv
    };
};

let util = Util();

let GitTokenManager = (gitTokens: string) => {
    // gitTokens:github.com=moodlee:ghp_xxxxx,gitee.com=ghp_xxxxx
    let gitUserTokenMap = {} as { [key: string]: string };
    if (gitTokens != "") {
        let gitTokenPairs = gitTokens.split(",");
        for (let gitTokenPair of gitTokenPairs) {
            if (gitTokenPair.includes("=") == false) {
                gitUserTokenMap.default = gitTokenPair;
                continue;
            }
            let gitSite = gitTokenPair.split("=")[0];
            let gitUserToken = gitTokenPair.split("=")[1];
            gitUserTokenMap[gitSite] = gitUserToken;
        }
    }
    console.log(`gitToken: ${gitUserTokenMap}`);
    let getGitUserToken = (gitUrl: string) => {
        let gitSite = gitUrl.split("/")[2];
        if (gitUserTokenMap[gitSite]) {
            return gitUserTokenMap[gitSite];
        }
        return gitUserTokenMap.default;
    };
    let getGitToken = (gitUrl: string) => {
        let userToken = getGitUserToken(gitUrl);
        if (userToken.includes(":") == false) {
            return userToken;
        }
        return userToken.split(":")[1];
    };
    let getGitUser = (gitUrl: string) => {
        let userToken = getGitUserToken(gitUrl);
        if (userToken.includes(":") == false) {
            return "";
        }
        return userToken.split(":")[0];
    };
    let insertGitUserToken = (gitUrl: string) => {
        let index = gitUrl.indexOf("//");
        let userToken = getGitUserToken(gitUrl);
        return gitUrl.substring(0, index + 2) + userToken + "@" + gitUrl.substring(index + 2);
    };

    return {
        get: () => gitUserTokenMap,
        getGitToken,
        getGitUserToken,
        getGitUser,
        insertGitUserToken
    };
};

let gitTokenManager = GitTokenManager(gitTokens);

let GitManager = () => {
    let getHttpProxy = async () => {
        return (await cmdAsync(Environment.CurrentDirectory, "git config --get http.proxy")).output?.trim();
    };
    let getGitUrlInfo = (gitUrl: string) => {
        console.log(`get git url info: ${gitUrl}`);
        console.log(`split: ${gitUrl.split("/")}`);
        let owner = gitUrl.split("/")[3];
        let repo = gitUrl.split("/")[4].split(".")[0];
        return { owner, repo };
    };
    let getLatestTag = async (owner: string, repo: string, token: string) => {
        let response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/tags`, {
            headers: {
                Authorization: `token ${token}`,
                "User-Agent": "tscl"
            }
        });
        if (response.data.length == 0) {
            return "";
        }
        return response.data[0].name as string;
    };

    let createTag = async (owner: string, repo: string, tagName: string, commit: string, token: string) => {
        // 创建标签对象
        let tagObjectResponse = await axios.post(`https://api.github.com/repos/${owner}/${repo}/git/tags`, {
            tag: tagName,
            message: tagName,
            object: commit,
            type: "commit"
        }, {
            headers: {
                Authorization: `token ${token}`,
                "User-Agent": "tscl"
            }
        });

        if (tagObjectResponse.status != 201) {
            console.log(`Create tag object ${tagName} failed`);
            return false;
        }

        // 创建引用指向标签对象
        let refResponse = await axios.post(`https://api.github.com/repos/${owner}/${repo}/git/refs`, {
            ref: `refs/tags/${tagName}`,
            sha: tagObjectResponse.data.sha
        }, {
            headers: {
                Authorization: `token ${token}`,
                "User-Agent": "tscl"
            }
        });

        if (refResponse.status != 201) {
            console.log(`Create tag ref ${tagName} failed`);
            return false;
        }

        return true;
    };
    let gitClone = async (tempDirectory: string, gitUrl: string, commit: string) => {
        gitUrl = gitTokenManager.insertGitUserToken(gitUrl);
        // 下一步，使用cloneUrl和commit下载代码
        console.log(`Create temp directory: ${tempDirectory}`);
        if (Directory.Exists(tempDirectory)) {
            deleteDirectory(tempDirectory);
        }
        Directory.CreateDirectory(tempDirectory);
        console.log(`Working Directory : ${tempDirectory}, Existing: ${Directory.Exists(tempDirectory)}`);
        console.log(`git clone --recurse-submodules ${gitUrl} .`);
        if ((await cmdAsync(tempDirectory, `git clone --recurse-submodules ${gitUrl} .`)).exitCode != 0) {
            console.log(`git clone ${gitUrl} failed, delete temp directory: ${tempDirectory}`);
            deleteDirectory(tempDirectory);
            return false;
        }
        if (commit != "") {
            console.log(`git checkout ${commit}`);
            if ((await cmdAsync(tempDirectory, `git checkout ${commit}`)).exitCode != 0) {
                console.log(`git checkout ${commit} failed, delete temp directory: ${tempDirectory}`);
                deleteDirectory(tempDirectory);
                return false;
            }
        }
        return true;
    };
    // tag such as v1.0.0
    let regex_TagName = new Regex("v\\d+\\.\\d+\\.\\d+");
    let increaseTag = async (gitUrl: string, commit: string) => {
        let info = getGitUrlInfo(gitUrl);
        let latestTag = await getLatestTag(info.owner, info.repo, gitTokenManager.getGitToken(gitUrl));
        // if (!regex_TagName.IsMatch(latestTag)) {
        //     console.log(`Latest tag is not a valid version: ${latestTag}`);
        //     return {
        //         success: false,
        //         tag: ""
        //     };
        // }
        if (!regex_TagName.IsMatch(latestTag)) {
            latestTag = "v0.0.0";
        }
        let version = Version.Parse(latestTag.substring(1));
        let newVersion = new Version(version.Major, version.Minor, version.Build + 1);
        let newTag = `v${newVersion}`;
        console.log(`New tag: ${newTag}`);
        await createTag(info.owner, info.repo, newTag, commit, gitTokenManager.getGitToken(gitUrl));
        return {
            success: true,
            tag: newTag
        };
    };

    return {
        getGitUrlInfo,
        getLatestTag,
        createTag,
        gitClone,
        increaseTag,
        getHttpProxy
    };
};

let gitManager = GitManager();

let CreateReactAppManager = () => {
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
    let build = async (tempDirectory: string, repo: string) => {
        // 设置镜像源
        // npm config set registry https://mirrors.cloud.tencent.com/npm/
        console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/`);
        if ((await cmdAsync(tempDirectory, `npm config set registry https://mirrors.cloud.tencent.com/npm/`)).exitCode != 0) {
            console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/ failed`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 下一步，使用npm install安装依赖
        console.log(`npm install`);
        if ((await cmdAsync(tempDirectory, `npm install`)).exitCode != 0) {
            console.log(`npm install failed, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 在.env文件中设置PUBLIC_URL为/repo
        console.log(`Set PUBLIC_URL=/${repo}`);
        let envFile = Path.Combine(tempDirectory, ".env");
        let envContent = `PUBLIC_URL=/${repo}
GENERATE_SOURCEMAP=false
REACT_APP_BUILD_TIME=${DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}`;
        console.log(envContent);
        File.WriteAllText(envFile, envContent, utf8);

        // 下一步，使用npm run build打包
        console.log(`npm run build`);
        if ((await cmdAsync(tempDirectory, `npm run build`)).exitCode != 0) {
            console.log(`npm run build failed, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 下一步，将打包后的文件复制到指定目录
        let destDirectory = Path.Combine(staticFrontPath, repo);
        console.log(`Copy to ${destDirectory}`);
        if (Directory.Exists(destDirectory)) {
            Directory.Delete(destDirectory, true);
        }
        copyDirectory(Path.Combine(tempDirectory, "build"), destDirectory);
        console.log(`Deploy success`);
    };
    return {
        isNodeJs,
        build
    };
};

let createReactAppManager = CreateReactAppManager();

let CreateViteAppManager = () => {
    let is = (tempDirectory: string) => {
        // 判断是否存在vite.config.ts
        let viteConfigJSPath = Path.Combine(tempDirectory, "vite.config.ts");
        if (!Path.Exists(viteConfigJSPath)) {
            console.log(`No vite.config.ts, the project is not a vite project`);
            return false;
        }
        return true;
    };
    let build = async (tempDirectory: string, repo: string) => {
        // 设置镜像源
        // npm config set registry https://mirrors.cloud.tencent.com/npm/
        console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/`);
        if ((await cmdAsync(tempDirectory, `npm config set registry https://mirrors.cloud.tencent.com/npm/`)).exitCode != 0) {
            console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/ failed`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 下一步，使用npm install安装依赖
        console.log(`npm install`);
        if ((await cmdAsync(tempDirectory, `npm install`)).exitCode != 0) {
            console.log(`npm install failed, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 在.env文件中设置VITE_PUBLIC_URL为/repo
        console.log(`Set VITE_PUBLIC_URL=/${repo}`);
        let envFile = Path.Combine(tempDirectory, ".env");
        let envContent = `VITE_PUBLIC_URL=/${repo}
GENERATE_SOURCEMAP=false
VITE_APP_BUILD_TIME=${DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}`;
        console.log(envContent);
        File.WriteAllText(envFile, envContent, utf8);

        // 下一步，使用npm run build打包
        console.log(`npm run build`);
        if ((await cmdAsync(tempDirectory, `npm run build`)).exitCode != 0) {
            console.log(`npm run build failed, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 下一步，将打包后的文件复制到指定目录
        let destDirectory = Path.Combine(staticFrontPath, repo);
        console.log(`Copy to ${destDirectory}`);
        if (Directory.Exists(destDirectory)) {
            Directory.Delete(destDirectory, true);
        }
        copyDirectory(Path.Combine(tempDirectory, "dist"), destDirectory);
        console.log(`Deploy success`);
    };
    return {
        is,
        build
    };
};

let createViteAppManager = CreateViteAppManager();

let DotNetManager = () => {
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
    let regex_Version = new Regex("<Version>\\s*(\\d+\\.\\d+\\.\\d+)\\s*</Version>");
    let getVersion = async (csprojPath: string) => {
        let csprojContent = await File.ReadAllTextAsync(csprojPath, utf8);
        let match = regex_Version.Match(csprojContent);
        if (match.Success) {
            return match.Groups[1].Value;
        }
        return "";
    };
    let pack = async (csprojPath: string) => {
        let currentDirectory = Path.GetDirectoryName(csprojPath);
        let version = await getVersion(csprojPath);
        let nugetPackageDirectory = Path.Combine(currentDirectory, "bin", "Release", version);
        if (Directory.Exists(nugetPackageDirectory)) {
            Directory.Delete(nugetPackageDirectory, true);
        }
        let cmd = `dotnet pack -c Release -o ${nugetPackageDirectory}`;
        console.log(cmd);
        let cmdResult = await cmdAsync(currentDirectory, cmd);
        console.log(`dotnet pack result: ${cmdResult}`);
        if (cmdResult.exitCode != 0) {
            console.log(`dotnet pack failed, delete nuget package directory: ${nugetPackageDirectory}`);
            if (Directory.Exists(nugetPackageDirectory)) {
                Directory.Delete(nugetPackageDirectory, true);
            }
            return "";
        }
        let files = Directory.GetFiles(nugetPackageDirectory, "*.nupkg");
        if (files.length == 0) {
            console.log(`No .nupkg file found`);
            return "";
        }
        return files[0];
    };
    let pubxmlSet = (pubXmlFile: string, key: string, value: string) => {
        let xml = Xml.Load(pubXmlFile);
        let project = xml.Root;
        let propertyGroup = project.GetOrCreateElementByName("PropertyGroup");
        let property = propertyGroup.GetOrCreateElementByName(key);
        property.InnerText = value;
        xml.Save(pubXmlFile);
    };
    let pubxmlGet = (pubXmlFile: string, key: string) => {
        let xml = Xml.Load(pubXmlFile);
        let project = xml.Root;
        let propertyGroup = project.GetOrCreateElementByName("PropertyGroup");
        let property = propertyGroup.GetOrCreateElementByName(key);
        return property.InnerText;
    };
    let csprojSet = (csprojFile: string, key: string, value: string) => {
        let xml = Xml.Load(csprojFile);
        let project = xml.Root;
        let propertyGroup = project.GetOrCreateElementByName("PropertyGroup");
        let property = propertyGroup.GetOrCreateElementByName(key);
        property.InnerText = value;
        xml.Save(csprojFile);
    };
    let publish = async (csprojPath: string) => {
        // 判断csproj所在目录下Properties/PublishProfiles/是否存在pubxml文件
        // 如果存在，则使用dotnet publish --publish-profile xxx
        let currentDirectory = Path.GetDirectoryName(csprojPath);
        let binDirectory = Path.Combine(currentDirectory, "bin");
        if (Directory.Exists(binDirectory) == false) {
            Directory.CreateDirectory(binDirectory);
        }
        let publishProfilesDirectory = Path.Combine(currentDirectory, "Properties", "PublishProfiles");
        let pubxmlFiles = Directory.Exists(publishProfilesDirectory) ?
            Directory.GetFiles(publishProfilesDirectory, "*.pubxml") :
            [];
        let restoreCmd = `dotnet restore --no-cache`;
        console.log(restoreCmd);
        let restoreResult = await cmdAsync(currentDirectory, restoreCmd);
        console.log(`dotnet restore result: ${restoreResult}`);
        if (restoreResult.exitCode != 0) {
            console.log(`dotnet restore failed`);
            return false;
        }
        if (pubxmlFiles.length == 0) {
            let cmd = `dotnet publish -c Release -f net8.0`;
            console.log(cmd);
            let publishResult = await cmdAsync(currentDirectory, cmd);
            console.log(`dotnet publish result: ${publishResult}`);
            if (publishResult.exitCode != 0) {
                console.log(`dotnet publish failed`);
                return false;
            }
        }
        else {
            console.log(`Publish Profiles: ${pubxmlFiles}`);
            for (let pubxmlFile of pubxmlFiles) {
                console.log(`Publish Profile: ${pubxmlFile}`);
                let publishDir = Path.Combine(currentDirectory, "bin", "publish", Path.GetFileNameWithoutExtension(pubxmlFile));
                pubxmlSet(pubxmlFile, "PublishDir", publishDir);
                console.log(`Publish Profile: ${File.ReadAllText(pubxmlFile, utf8)}`);
                let cmd = `dotnet publish -c Release -p:PublishProfile=${Path.GetFileNameWithoutExtension(pubxmlFile)}`;
                console.log(cmd);
                let publishResult = await cmdAsync(currentDirectory, cmd);
                console.log(`dotnet publish result: ${publishResult}`);
                if (publishResult.exitCode != 0) {
                    console.log(`dotnet publish failed`);
                    return false;
                }
            }
            console.log(`Complete publish profiles`);
        }
        return true;
    };
    let regex_GeneratePackageOnBuild = new Regex("<GeneratePackageOnBuild>\\s*(true|True)\\s*</GeneratePackageOnBuild>");
    let isGeneratePackageOnBuild = (csprojPath: string) => {
        let csprojContent = File.ReadAllText(csprojPath, utf8);
        if (regex_GeneratePackageOnBuild.IsMatch(csprojContent)) {
            console.log(`Found <GeneratePackageOnBuild>true</GeneratePackageOnBuild> in ${csprojPath}`);
            return true;
        }
        console.log(`No <GeneratePackageOnBuild>true</GeneratePackageOnBuild> found in any .csproj file`);
        return false;
    };
    let nugetPush = async (nugetPackagePath: string) => {
        // 通过dotnet上传nuget包
        let cmd = `dotnet nuget push ${Path.GetFileName(nugetPackagePath)} --api-key ${nugetSecret} --source https://api.nuget.org/v3/index.json`;
        console.log(cmd);
        let cmdResult = await cmdAsync(Path.GetDirectoryName(nugetPackagePath), cmd);
        console.log(`dotnet nuget push result: ${cmdResult}`);
        if (cmdResult.exitCode != 0) {
            console.log(`dotnet nuget push failed`);
            return false;
        }
        return true;
    };
    let release = async (tempDirectory: string, gitUrl: string) => {
        console.log('-'.padStart(20, '-') + "release" + '-'.padEnd(20, '-'));
        // debugger;
        let info = gitManager.getGitUrlInfo(gitUrl);
        let releaseConfig = Path.Combine(tempDirectory, ".gitrelease.json");
        if (!File.Exists(releaseConfig)) {
            console.log(`No release.json found`);
            return;
        }
        let releaseJson = Json.Load(releaseConfig);
        if (releaseJson.enable == false) {
            console.log(`Release is disabled`);
            return;
        }
        console.log(`Release = ${releaseJson}`);
        let filesRegex;
        let filesRegexString = releaseJson.files;
        if (filesRegexString && (filesRegexString.length > 0)) {
            filesRegex = new Regex(filesRegexString);
        }
        else {
            filesRegex = null;
        }
        console.log(`Files Regex: ${filesRegex}`);
        let pubxmlDirectory = Path.Combine(tempDirectory, "Properties", "PublishProfiles");
        console.log(`Publish Profiles Directory: ${pubxmlDirectory}`);
        let pubxmlFiles = Directory.GetFiles(pubxmlDirectory, "*.pubxml");
        console.log(`Publish Profiles: ${pubxmlFiles}`);
        if (pubxmlFiles.length == 0) {
            console.log(`Release is enabled but no .pubxml file found`);
            return;
        }

        let toReleaseFiles = [] as string[];
        for (let pubxmlFile of pubxmlFiles) {
            let publishDir = Path.Combine(tempDirectory, "bin", "publish", Path.GetFileNameWithoutExtension(pubxmlFile));
            console.log(`publishDir: ${publishDir}`);
            let files = Directory.GetFiles(publishDir);
            console.log(`Files: ${files}`);
            if (filesRegex != null) {
                for (let file of files) {
                    let fileName = Path.GetFileName(file);
                    if (filesRegex.IsMatch(fileName)) {
                        toReleaseFiles.push(file);
                    }
                }
            }
            else {
                let zipPath = `${publishDir}.zip`;
                await zip.compress(publishDir, zipPath);
                toReleaseFiles.push(zipPath);
            }
        }
        console.log(`To release files: ${toReleaseFiles}`);
        let token = gitTokenManager.getGitToken(gitUrl);
        let tagName = releaseJson.tag ?? await gitManager.getLatestTag(info.owner, info.repo, token);
        if (tagName == "" || tagName == null || tagName == undefined) {
            console.log(`No tag found`);
            return;
        }
        if (toReleaseFiles.length == 0) {
            console.log(`No file to release`);
            return;
        }
        await execAsync({
            filePath: Environment.ProcessPath,
            arguments: ["run", "gitapis", "release", gitUrl, tagName,
                "--files", toReleaseFiles.join(","),
                "--token", token]
        });
    };
    let service = async (tempDirectory: string, repo: string) => {
        // 如果发布目录下存在.service，说明是一个服务
        // 修改.service 文件中的WorkingDirectory为destDirectory
        // 将服务文件拷贝到/ect/systemd/system/目录下，并重启服务
        let serviceFiles = Directory.GetFiles(tempDirectory, "*.service");
        if (serviceFiles.length != 1) {
            console.log(`More than one .service file found or no .service file found`);
            return;
        }
        let systemName = await util.getSystemName();
        let pubxmlDirectory = Path.Combine(tempDirectory, "Properties", "PublishProfiles");
        let pubxmlFiles = Directory.GetFiles(pubxmlDirectory, "*.pubxml").filter(item => pubxmlGet(item, "RuntimeIdentifier") == systemName);
        if (pubxmlFiles.length == 0) {
            console.log(`No .pubxml file found for ${systemName}`);
            return;
        }
        let publishDirectory = Path.Combine(tempDirectory, "bin", "publish", Path.GetFileNameWithoutExtension(pubxmlFiles[0]));
        // 停止服务
        let serviceFile = serviceFiles[0];
        let serviceName = Path.GetFileName(serviceFile);
        console.log(`systemctl stop ${serviceName}`);
        await cmdAsync(tempDirectory, `sudo systemctl stop ${serviceName}`);
        await Task.Delay(1000);
        // 将workingDirectory修改为部署目录
        let destDirectory = Path.Combine(staticEndPath, repo);
        let serviceContent = File.ReadAllText(serviceFile, utf8);
        let envFile = Path.Combine(destDirectory, ".env");
        serviceContent = serviceContent.replace(/^WorkingDirectory=.*$/m, `WorkingDirectory=${destDirectory}`);
        // 替换EnvironmentFile
        serviceContent = serviceContent.replace(/^EnvironmentFile=.*$/m, `EnvironmentFile=${envFile}`);
        // 替换User
        serviceContent = serviceContent.replace(/^User=.*$/m, `User=${Environment.UserName}`);
        serviceContent = serviceContent.replace("<WorkingDirectory>", destDirectory);
        File.WriteAllText(serviceFile, serviceContent, utf8);
        // 将发布目录下的文件拷贝到部署目录
        if (Directory.Exists(destDirectory) == false) {
            if ((await cmdAsync(tempDirectory, `mkdir -p ${destDirectory}`)).exitCode != 0) {
                console.log(`Create ${destDirectory} failed`);
                return;
            }
        }

        if ((await cmdAsync(tempDirectory, `cp -rf ${publishDirectory}/* ${destDirectory}`)).exitCode != 0) {
            console.log(`Copy ${publishDirectory} to ${destDirectory} failed`);
            return;
        }
        let envCmd = `env > ${envFile}`;
        console.log(envCmd);
        await cmdAsync(tempDirectory, envCmd);
        let serviceDestFile = Path.Combine("/etc/systemd/system", Path.GetFileName(serviceFile));
        let cpServiceCommand = `sudo cp ${serviceFile} ${serviceDestFile}`;
        console.log(cpServiceCommand);
        if ((await cmdAsync(tempDirectory, cpServiceCommand)).exitCode != 0) {
            console.log(`Copy ${serviceFile} to ${serviceDestFile} failed`);
            return;
        }
        let daemonReloadCommand = `sudo systemctl daemon-reload`;
        console.log(daemonReloadCommand);
        if ((await cmdAsync(tempDirectory, daemonReloadCommand)).exitCode != 0) {
            console.log(`Reload daemon failed`);
            return;
        }
        let restartCommand = `sudo systemctl start ${Path.GetFileNameWithoutExtension(serviceFile)}`;
        console.log(restartCommand);
        if ((await cmdAsync(tempDirectory, restartCommand)).exitCode != 0) {
            console.log(`Restart service failed`);
            return;
        }
    };
    let build = async (tempDirectory: string, repo: string, version: string, gitUrl: string) => {
        console.log(`build ${{
            tempDirectory,
            repo,
            version
        }}`);
        let csprojFiles = Directory.GetFiles(tempDirectory, "*.csproj");
        if (csprojFiles.length != 1) {
            console.log(`More than one .csproj file found or no .csproj file found`);
            return;
        }
        let csprojPath = csprojFiles[0];
        csprojSet(csprojPath, "Version", version);
        if (await publish(csprojPath) == false) {
            console.log(`Publish failed`);
            return;
        }
        if (isGeneratePackageOnBuild(csprojPath)) {
            let nugetPackagePath = await pack(csprojPath);
            if (File.Exists(nugetPackagePath)) {
                await nugetPush(nugetPackagePath);
            }
        }
        await release(tempDirectory, gitUrl);
        await service(tempDirectory, repo);
    };

    return {
        isDotNet,
        getVersion,
        pack,
        pubxmlSet,
        publish,
        isGeneratePackageOnBuild,
        nugetPush,
        build
    };
};

let dotNetManager = DotNetManager();

let Transfer = () => {
    let getProcessor = (tempDirectory: string) => {
        let manifestFile = Path.Combine(tempDirectory, "manifest.json");
        if (File.Exists(manifestFile) == false) {
            return {
                success: false
            };
        }
        let manifest = Json.Load(manifestFile);
        if (manifest.webhook) {
            if (manifest.webhook.plugin) {
                return {
                    success: true,
                    Processor: {
                        "Name": manifest.webhook.plugin,
                        "Type": "Plugin"
                    }
                }
            }
        }
        return {
            success: false
        };
    };
    return {
        getProcessor
    };
};

let transfer = Transfer();

let webhook = async (session: Session) => {
    let data = await session.Cache.GetRequstBodyJson();
    if (data.ref) {
        console.log(`Received: ${data.ref}`);
    }
    let branchName = Path.GetFileName(data.ref);
    if (branches.includes(branchName) == false) {
        console.log(`Skip: ${data.ref}`);
        return;
    }
    let cloneUrl = data.repository.clone_url;
    let commit = data.head_commit.id;
    let repo = data.repository.name;
    let tempDirectory = Path.Combine(homeTempDirectory, commit);
    // 克隆代码
    console.log(`Clone ${cloneUrl} ${commit}`);
    if (await gitManager.gitClone(tempDirectory, cloneUrl, commit) == false) {
        console.log(`git clone failed`);
        return;
    }
    // 升版本号
    let tagResult = await gitManager.increaseTag(cloneUrl, commit);
    if (tagResult.success == false) {
        console.log(`Increase tag failed`);
        return;
    }
    if (createViteAppManager.is(tempDirectory)) {
        await createViteAppManager.build(tempDirectory, repo);
    }
    else if (createReactAppManager.isNodeJs(tempDirectory)) {
        await createReactAppManager.build(tempDirectory, repo);
    }
    else if (dotNetManager.isDotNet(tempDirectory)) {
        await dotNetManager.build(tempDirectory, repo, tagResult.tag.substring(1), cloneUrl);
    }
    else {
        let processor = transfer.getProcessor(tempDirectory);
        console.log(`processor: ${processor}`);
        if (processor.success) {
            let response = await axios.post(`http://127.0.0.1:${Number(port)}/api/v1/tasks/run`, {
                Input: {
                    webhook: data,
                    gitUserToken: gitTokenManager.get()
                },
                Processor: processor.Processor
            }, {
                useDefaultProxy: false
            });
            console.log(response);
        }
    }

    if (Directory.Exists(tempDirectory)) {
        deleteDirectory(tempDirectory);
        console.log(`Delete temp directory: ${tempDirectory}`);
    }
};

let main = async () => {
    if (parameters.help) {
        help();
        return;
    }
    axios.setDefaultProxy();
    let server = new Server();
    server.useStatic(staticFrontPath);
    console.log(`Static Path: ${staticFrontPath}`);
    server.use("/api/v1/webhook", async (session: Session) => {
        try {
            await webhook(session);
        }
        catch (e) {
            console.log(e);
            throw e;
        }
        console.log("Webhook success");
    });
    await server.start(Number(port));
};

if (File.Exists(script_path)) {
    console.log(File.GetLastWriteTime(script_path).ToString());
}

await main();

