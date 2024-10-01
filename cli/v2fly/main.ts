import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory, deleteDirectory, script_path } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/TypeSharp/System/Server";
import { axios } from "../.tsc/TypeSharp/System/axios";
import { zip } from "../.tsc/TypeSharp/System/zip";
import { PlatformID } from "../.tsc/System/PlatformID";
import { Guid } from "../.tsc/System/Guid";
import { Convert } from "../.tsc/System/Convert";
import { Json } from "../.tsc/TidyHPC/LiteJson/Json";
let utf8 = new UTF8Encoding(false);
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
console.log(`parameters: ${parameters}`);
let port = parameters.port ?? "8080";
let vmessUrl = parameters.vmess;

let help = () => {
    console.log("Usage: v2fly client --port 8080 --vmessUrl vmess://xxx");
};

let startClient = async (programPath: string) => {
    let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'client.json');
    let template = await File.ReadAllTextAsync(templatePath, utf8);
    let configPath = Path.Combine(Path.GetTempPath(), `${Guid.NewGuid().ToString("N")}.json`);
    let vmess = Json.Parse(utf8.GetString(Convert.FromBase64String(vmessUrl.substring(8))));
    let config = template.replace("${address}", vmess.add)
        .replace("<port>", port)
        .replace("<vmess-address>", vmess.add)
        .replace("<vmess-port>", vmess.port)
        .replace("<vmess-id>", vmess.id)
        .replace("<vmess-alterId>", vmess.aid)
        .replace("<vmess-security>", vmess.type);
    await File.WriteAllTextAsync(configPath, config, utf8);
    await execAsync(programPath, "run", "-config", configPath);
};

let main = async () => {
    if (vmessUrl == undefined) {
        console.error("vmessUrl is required");
        help();
        return;
    }
    let programId = "FE8826DC-18F9-411A-A851-5DC68A12F5BF";
    let programPath;
    if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
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
        if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
            console.log(`download ${windowsUrl}`);
            await axios.download(windowsUrl, zipPath);
        }
        else {
            console.log(`download ${linuxUrl}`);
            await axios.download(linuxUrl, zipPath);
        }
        let zipExtractPath = Path.Combine(Path.GetTempPath(), programId);
        zip.extract(zipPath, zipExtractPath);
        if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
            let exePath = Path.Combine(zipExtractPath, "v2ray.exe");
            File.Copy(exePath, programPath);
        }
        else {
            let exePath = Path.Combine(zipExtractPath, "v2ray");
            File.Copy(exePath, programPath);
        }
        deleteDirectory(zipExtractPath);
        File.Delete(zipPath);
    };
    console.log(`programPath: ${programPath}`);
    if (args[0] == 'client') {
        await startClient(programPath);
    }
};
await main();
