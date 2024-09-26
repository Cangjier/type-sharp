import { cmdAsync, exec, execAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { axios } from "../.tsc/TypeSharp/System/axios";
let main = async () => {
    let response = await axios.get("https://mirrors.cloud.tencent.com/nodejs-release/index.json");
    try {
        let versions = JSON.parse(response.data);
        let ltsVersions = versions.filter((v: any) => v.lts);
        let latestLtsVersion = ltsVersions[0].version;
        console.log(`Latest LTS version is ${latestLtsVersion}`);
        let downloadUrl = `https://mirrors.cloud.tencent.com/nodejs-release/${latestLtsVersion}/node-${latestLtsVersion}-linux-x64.tar.xz`;
        console.log(`Downloading ${downloadUrl}`);
        await cmdAsync(Environment.CurrentDirectory, `wget ${downloadUrl}`);
        await execAsync(Environment.CurrentDirectory, `tar -xf node-${latestLtsVersion}-linux-x64.tar.xz`);
        await execAsync(Environment.CurrentDirectory, `sudo mv node-${latestLtsVersion}-linux-x64 /usr/local/nodejs`);
        await execAsync(Environment.CurrentDirectory, `rm node-${latestLtsVersion}-linux-x64.tar.xz`);
        await execAsync(Environment.CurrentDirectory, `echo 'export PATH=/usr/local/nodejs/bin:$PATH' >> ~/.bashrc`);
        await execAsync(Environment.CurrentDirectory, `source ~/.bashrc`);
    }
    catch (e) {
        console.log(response, e);
        throw e;
    }
};

await main();