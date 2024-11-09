import { cmdAsync, exec, execAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
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
    if ((await cmdAsync(Environment.CurrentDirectory, `sudo wget ${downloadUrl}`)).exitCode != 0) {
        console.log("Download failed");
        return;
    }
    if ((await cmdAsync(Environment.CurrentDirectory, `sudo tar -xf node-${latestLtsVersion}-linux-x64.tar.xz`)).exitCode != 0) {
        console.log("Extract failed");
        return;
    }
    if ((await cmdAsync(Environment.CurrentDirectory, `sudo mv node-${latestLtsVersion}-linux-x64 /usr/local/nodejs`)).exitCode != 0) {
        console.log("Move failed");
        return;
    }
    if ((await cmdAsync(Environment.CurrentDirectory, `sudo rm node-${latestLtsVersion}-linux-x64.tar.xz`)).exitCode != 0) {
        console.log("Remove failed");
        return;
    }
    if ((await cmdAsync(Environment.CurrentDirectory, `sudo echo 'export PATH=/usr/local/nodejs/bin:$PATH' >> ~/.bashrc`)).exitCode != 0) {
        console.log("Add to bashrc failed");
        return;
    }
    if ((await cmdAsync(Environment.CurrentDirectory, `sudo source ~/.bashrc`)).exitCode != 0) {
        console.log("Resource bashrc failed");
        return;
    }
};

await main();