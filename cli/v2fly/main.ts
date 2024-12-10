import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory, deleteDirectory, script_path, env } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/Cangjie/TypeSharp/System/Server";
import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { zip } from "../.tsc/Cangjie/TypeSharp/System/zip";
import { PlatformID } from "../.tsc/System/PlatformID";
import { Guid } from "../.tsc/System/Guid";
import { Convert } from "../.tsc/System/Convert";
import { Json } from "../.tsc/TidyHPC/LiteJson/Json";
let utf8 = new UTF8Encoding(false);
let homeDirectory = env("userprofile");
let v2flyDirectory = Path.Combine(homeDirectory, ".v2fly");
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
    console.log("Usage: v2fly client --port 8080 --vmess vmess://xxx");
    console.log("Usage: v2fly server --port 8080");
};

let generateClientConfig = async (configPath: string) => {
    let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'client.json');
    let template = await File.ReadAllTextAsync(templatePath, utf8);
    console.log(`vmessUrl: ${vmessUrl}`);
    console.log(`vmessUrl.substring(8): ${vmessUrl.substring(8)}`);
    let vmess = Json.Parse(utf8.GetString(Convert.FromBase64String(vmessUrl.substring(8))));
    let config = template.replace("${address}", vmess.add)
        .replace("<port>", port)
        .replace("<vmess-address>", vmess.add)
        .replace("<vmess-port>", vmess.port)
        .replace("<vmess-id>", vmess.id)
        .replace("<vmess-aid>", vmess.aid ?? "0")
        .replace("<vmess-alterId>", vmess.aid ?? "0")
        .replace("<vmess-security>", vmess.type ?? "auto")
        .replace("<streamSettings-network>", vmess.net ?? "tcp")
        .replace("<streamSettings-grpcSettings-serviceName>", (vmess.path == undefined ? "null" : `"${vmess.path}"`))
        .replace("<streamSettings-tlsSettings-serverName>", (vmess.sni == undefined ? "null" : `"${vmess.sni}"`))
        .replace("<streamSettings-security>", vmess.tls ?? "none");
    console.log(`config=${config}`);
    await File.WriteAllTextAsync(configPath, config, utf8);
};

let generateServerConfig = async (configPath: string) => {
    let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'server.json');
    let template = await File.ReadAllTextAsync(templatePath, utf8);
    let config = template.replace("<port>", port);
    await File.WriteAllTextAsync(configPath, config, utf8);
};

let subscribeVmess = async (url: string) => {
    let response = await axios.get(url, {
        responseType: "text"
    });
    let base64 = response.data;
    let lines = utf8.GetString(Convert.FromBase64String(base64)).replace('\r', '').split('\n');
    for (let line of lines) {
        if (line.startsWith("vmess://")) {
            let vmess = Json.Parse(utf8.GetString(Convert.FromBase64String(line.substring(8))));
            console.log(vmess);
        }
    }
};

let startClient = async (programPath: string) => {
    let configGuid = "D5DFCD26946440B194805F932A5324F4.client";
    let configPath = Path.Combine(v2flyDirectory, `${configGuid}.json`);;
    if (vmessUrl) {
        await generateClientConfig(configPath);
    }
    else if (File.Exists(configPath) == false) {
        console.log("vmess is required");
        help();
        return;
    }
    if (Environment.OSVersion.Platform == PlatformID.Win32NT) {

    }
    else {
        // 给程序权限
        await cmdAsync(Environment.CurrentDirectory, `chmod +x ${programPath}`);
    }
    // await execAsync(programPath, "run", "-config", configPath);
    await execAsync({
        filePath: programPath,
        arguments: ["run", "-config", configPath]
    });
};

let startServer = async (programPath: string) => {
    let configGuid = "D5DFCD26946440B194805F932A5324F4.server";
    let configPath = Path.Combine(v2flyDirectory, `${configGuid}.json`);
    if (File.Exists(configPath) == false) {
        await generateServerConfig(configPath);
    }
    // await execAsync(programPath, "run", "-config", configPath);
    await execAsync({
        filePath: programPath,
        arguments: ["run", "-config", configPath]
    });
};

let main = async () => {
    let programId = "FE8826DC-18F9-411A-A851-5DC68A12F5BF";
    let programPath;

    if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
        programPath = Path.Combine(v2flyDirectory, `${programId}.exe`);
    }
    else {
        if (Directory.Exists(v2flyDirectory) == false) {
            Directory.CreateDirectory(v2flyDirectory);
        }
        programPath = Path.Combine(v2flyDirectory, programId);
    }
    if (File.Exists(programPath) == false) {
        let linuxUrl = "https://github.com/v2fly/v2ray-core/releases/download/v5.19.0/v2ray-linux-64.zip";
        let windowsUrl = "https://github.com/v2fly/v2ray-core/releases/download/v5.19.0/v2ray-windows-64.zip";
        let gitHttpProxyResult = await cmdAsync(Environment.CurrentDirectory, "git config http.proxy");
        if (gitHttpProxyResult.output && gitHttpProxyResult.output.length > 0) {
            let proxy = gitHttpProxyResult.output.trim();
            if (proxy.length > 0) {
                console.log(`use proxy: ${proxy}`);
                axios.setProxy(proxy);
            }
        }
        // 根据平台自动下载
        let zipPath = Path.Combine(v2flyDirectory, `${programId}.zip`);
        if (File.Exists(zipPath) == false) {
            if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
                console.log(`download ${windowsUrl} -> ${zipPath}`);
                await axios.download(windowsUrl, zipPath);
            }
            else {
                console.log(`download ${linuxUrl} -> ${zipPath}`);
                await axios.download(linuxUrl, zipPath);
            }
        }
        let zipExtractPath = Path.Combine(v2flyDirectory, `${programId}.extract`);
        await zip.extract(zipPath, zipExtractPath);
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
    else if (args[0] == 'server') {
        await startServer(programPath);
    }
    else {
        help();
    }
};

try {
    await main();
}
catch (e) {
    console.log(e);
}