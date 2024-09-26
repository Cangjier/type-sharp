import { Server } from '../.tsc/TypeSharp/System/Server';
import { Session } from '../.tsc/TidyHPC/Routers/Urls/Session';
import { args, cmd, cmdAsync, copyDirectory } from '../.tsc/context';
import { Path } from '../.tsc/System/IO/Path';
import { File } from '../.tsc/System/IO/File';
import { Directory } from '../.tsc/System/IO/Directory';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';

let main = async () => {
    let utf8 = new UTF8Encoding(false);
    let server = new Server();
    let staticPath = Path.Combine(Path.GetTempPath(), "webhook-react-deploy");
    server.useStatic(staticPath);
    console.log(`Static Path: ${staticPath}`);
    server.use("/api/v1/webhook", async (session: Session) => {
        let data = await session.Cache.GetRequstBodyJson();
        if (data.ref != "refs/heads/main") {
            console.log(`Skip: ${data.ref}`);
            return;
        }
        let cloneUrl = data.repository.clone_url;
        let commit = data.head_commit.id;
        let repo = data.repository.name;
        // 下一步，使用cloneUrl和commit下载代码
        let tempDirectory = Path.Combine(Path.GetTempPath(), commit);
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
        console.log(`git checkout ${commit}`);
        if (await cmdAsync(tempDirectory, `git checkout ${commit}`) != 0) {
            console.log(`git checkout ${commit} failed, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 判断是否存在package.json
        console.log(`Check package.json`);
        if (!Path.Exists(Path.Combine(tempDirectory, "package.json"))) {
            console.log(`No package.json, delete temp directory: ${tempDirectory}`);
            Directory.Delete(tempDirectory, true);
            return;
        }
        // 设置镜像源
        // npm config set registry https://mirrors.cloud.tencent.com/npm/
        console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/`);
        if (await cmdAsync(tempDirectory, `npm config set registry https://mirrors.cloud.tencent.com/npm/`) != 0) {
            console.log(`npm config set registry https://mirrors.cloud.tencent.com/npm/ failed, delete temp directory: ${tempDirectory}`);
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
        console.log(`Set PUBLIC_URL=.${repo}`);
        let envFile = Path.Combine(tempDirectory, ".env");
        let envContent = `PUBLIC_URL=.${repo}`;
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
        Directory.Delete(tempDirectory, true);
        console.log(`Delete temp directory: ${tempDirectory}`);
    });
    await server.start(Number(args[0]));
};

await main();