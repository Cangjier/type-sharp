import { cmdAsync, exec, execAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { axios } from "../.tsc/TypeSharp/System/axios";
let main = async () => {
    let response = await axios.get("https://mirrors.cloud.tencent.com/nodejs-release/index.json", {
        responseType: "json"
    } as any);
    let versions = response.data;
    let ltsVersions = versions.filter((v: any) => v.lts);
    let latestLtsVersion = ltsVersions[0].version;
    console.log(`Latest LTS version is ${latestLtsVersion}`);
    let downloadUrl = `https://mirrors.cloud.tencent.com/nodejs-release/${latestLtsVersion}/node-${latestLtsVersion}-linux-x64.tar.xz`;
    console.log(`Downloading ${downloadUrl}`);
    await cmdAsync(Environment.CurrentDirectory, `wget ${downloadUrl}`);
    await cmdAsync(Environment.CurrentDirectory, `tar -xf node-${latestLtsVersion}-linux-x64.tar.xz`);
    await cmdAsync(Environment.CurrentDirectory, `sudo mv node-${latestLtsVersion}-linux-x64 /usr/local/nodejs`);
    await cmdAsync(Environment.CurrentDirectory, `rm node-${latestLtsVersion}-linux-x64.tar.xz`);
    await cmdAsync(Environment.CurrentDirectory, `echo 'export PATH=/usr/local/nodejs/bin:$PATH' >> ~/.bashrc`);
    await cmdAsync(Environment.CurrentDirectory, `source ~/.bashrc`);
};

await main();