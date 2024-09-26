import { cmdAsync, exec, execAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { axios } from "../.tsc/TypeSharp/System/axios";
let main = async () => {
    let response = await axios.get("https://mirrors.cloud.tencent.com/nodejs-release/index.json");
    // wget https://mirrors.cloud.tencent.com/nodejs-release/v18.18.0/node-v18.18.0-linux-x64.tar.xz
    let versions = JSON.parse(response.data);
    let ltsVersions = versions.filter((v: any) => v.lts!=false);
    console.log(ltsVersions);
};

await main();