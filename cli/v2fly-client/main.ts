import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/TypeSharp/System/Server";
import { axios } from "../.tsc/TypeSharp/System/axios";
import { zip } from "../.tsc/TypeSharp/System/zip";

console.log(args);
let main = async () => {
    let programId = "FE8826DC-18F9-411A-A851-5DC68A12F5BF";
    let programPath;
    if (Environment.OSVersion == "Windows_NT") {
        programPath = Path.Combine(Path.GetTempPath(), `${programId}.exe`);
    }
    else {
        programPath = Path.Combine(Path.GetTempPath(), programId);
    }
    if (File.Exists(programPath) == false) {
        let linuxUrl = "https://github.com/v2fly/v2ray-core/releases/download/v5.19.0/v2ray-linux-64.zip";
        let windowsUrl = "https://github.com/v2fly/v2ray-core/releases/download/v5.19.0/v2ray-windows-64.zip";
        let gitHttpProxy = {} as any;
        await cmdAsync(Environment.CurrentDirectory, "git config http.proxy", gitHttpProxy);
        if (gitHttpProxy.lines && gitHttpProxy.lines.length > 0) {
            let proxy = gitHttpProxy.lines[0].trim();
            if (proxy.length > 0) {
                console.log(`use proxy: ${proxy}`);
                axios.setProxy(proxy);
            }
        }
        // 根据平台自动下载
        let zipPath = Path.Combine(Path.GetTempPath(), `${programId}.zip`);
        console.log(Environment.OSVersion);
        if (Environment.OSVersion == "Windows_NT") {
            await axios.download(windowsUrl, zipPath);
        }
        else {
            await axios.download(linuxUrl, zipPath);
        }
        let zipExtractPath = Path.Combine(Path.GetTempPath(), programId);
        zip.extract(zipPath, zipExtractPath);
        if (Environment.OSVersion == "Windows_NT") {
            let exePath = Path.Combine(zipExtractPath, "v2ray.exe");
            File.Copy(exePath, programPath);
        }
        else {
            let exePath = Path.Combine(zipExtractPath, "v2ray");
            File.Copy(exePath, programPath);
        }
    };
};
await main();
