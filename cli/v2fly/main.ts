import { args, axios, script_path } from "../.tsc/Context";
import { exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory, deleteDirectory, env, kill } from "../.tsc/staticContext";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/Cangjie/TypeSharp/System/Server";
import { zip } from "../.tsc/Cangjie/TypeSharp/System/zip";
import { PlatformID } from "../.tsc/System/PlatformID";
import { Guid } from "../.tsc/System/Guid";
import { Convert } from "../.tsc/System/Convert";
import { Json } from "../.tsc/TidyHPC/LiteJson/Json";
import { DateTime } from "../.tsc/System/DateTime";
import { netUtils } from "../.tsc/Cangjie/TypeSharp/System/netUtils";
import { pingConfig } from "../.tsc/Cangjie/TypeSharp/System/pingConfig";
let utf8 = new UTF8Encoding(false);
let script_directory = Path.GetDirectoryName(script_path);
let v2flyDirectory = Path.Combine(script_directory, ".v2fly");
if (Directory.Exists(v2flyDirectory) == false) {
    Directory.CreateDirectory(v2flyDirectory);
}
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
let vpnUrl = parameters.url;

interface Subscription {
    url: string,
    protocolUrls: string[]
}

interface PingResult {
    protocolUrl: string,
    ping: number
}

interface VPNConfig {
    port: string
}

interface IV2flyManager {
    // 获取订阅地址
    getSubscribers: () => Subscription[],
    // 添加订阅地址
    addSubscribers: (urls: string[]) => void,
    // 删除订阅地址
    removeSubscribers: (urls: string[]) => void,
    // 更新订阅地址
    updateSubscribers: (urls: string[]) => Promise<Subscription[]>,
    // 测试协议地址的延迟
    ping: (protocolUrls: string[]) => Promise<PingResult[]>,
    // 获取当前协议地址
    getCurrentProtocolUrl: () => string,
    // 切换到协议地址
    switchToProtocolUrl: (protocolUrl: string) => void,
    // 获取当前配置
    getConfig: () => VPNConfig,
    // 设置当前配置
    setConfig: (config: VPNConfig) => void,
    initialize: () => Promise<void>
}

let V2flyConverter = () => {
    let generateVmessClientConfig = (configPath: string, url: string, port: string) => {
        let templatePath = Path.Combine(script_directory, 'vmess-client.json');
        let template = File.ReadAllText(templatePath, utf8);
        console.log(`url: ${url}`);
        console.log(`url.substring(8): ${url.substring(8)}`);
        let vmess = Json.Parse(utf8.GetString(Convert.FromBase64String(url.substring(8))));
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
        File.WriteAllText(configPath, config, utf8);
    };

    let generateTrojanClientConfig = (configPath: string, url: string, port: string) => {
        let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'trojan-client.json');
        let template = File.ReadAllText(templatePath, utf8);
        // url such as trojan://9c008fca-68e1-3ab4-b821-0071ce25ffdb@hky.cloud-services.top:443?allowInsecure=0&type=tcp#%E5%89%A9%E4%BD%99%E6%B5%81%E9%87%8F%EF%BC%9A643.84%20GB
        url = url.substring("trojan://".length);
        let password = url.substring(0, url.indexOf('@'));
        let address = url.substring(password.length + 1, url.indexOf(':'));
        let outport = url.substring(address.length + 1, url.indexOf('?'));
        let dict = {} as { [key: string]: any };
        let query = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
        let title = url.substring(url.indexOf('#') + 1);
        let pairs = query.split('&');
        for (let pair of pairs) {
            let key = pair.substring(0, pair.indexOf('='));
            let value = pair.substring(pair.indexOf('=') + 1);
            dict[key] = value;
        }
        let allowInsecure = dict["allowInsecure"] ?? "0";
        let network = dict["type"] ?? "tcp";

        let config = template.replace("<password>", password);
        config = config.replace("<address>", address);
        config = config.replace("<in-port>", port);
        config = config.replace("<out-port>", outport);
        config = config.replace("<network>", network);
        config = config.replace("<allowInsecure>", allowInsecure);
        console.log(`config=${config}`);
        File.WriteAllText(configPath, config, utf8);
    }

    let generateVmessServerConfig = (configPath: string, port: string) => {
        let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'vmess-server.json');
        let template = File.ReadAllText(templatePath, utf8);
        let config = template.replace("<port>", port);
        File.WriteAllText(configPath, config, utf8);
    };

    return {
        generateVmessClientConfig,
        generateTrojanClientConfig,
        generateVmessServerConfig
    };
};

let v2flyConverter = V2flyConverter();

let V2flyManager = () => {
    let programPath = Path.Combine(v2flyDirectory, "v2ray");
    if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
        programPath += ".exe";
    }
    let self = {} as IV2flyManager;
    let vpnConfig = {} as VPNConfig;
    let vpnConfigPath = Path.Combine(v2flyDirectory, "vpn-config.json");
    let data = {} as {
        currentProtocolUrl: string,
        subscriptions: Subscription[]
    };
    let dataPath = Path.Combine(v2flyDirectory, "data.json");
    let currentProcessID = -1;
    if (File.Exists(vpnConfigPath)) {
        vpnConfig = Json.Load(vpnConfigPath);
    }
    if (File.Exists(dataPath)) {
        data = Json.Load(dataPath);
    }
    let saveData = () => {
        File.WriteAllText(vpnConfigPath, JSON.stringify(vpnConfig), utf8);
        File.WriteAllText(dataPath, JSON.stringify(data), utf8);
    };
    let getSubscribers = () => {
        return data.subscriptions;
    };
    let addSubscribers = (urls: string[]) => {
        for (let url of urls) {
            if (!data.subscriptions.find(s => s.url == url)) {
                data.subscriptions.push({
                    url,
                    protocolUrls: []
                });
            }
        }
        saveData();
    };
    let removeSubscribers = (urls: string[]) => {
        for (let url of urls) {
            data.subscriptions = data.subscriptions.filter(s => s.url != url);
        }
        saveData();
    };
    let getProtocolUrlsFromSubscriptionUrl = async (url: string) => {
        let response = await axios.get(url, {
            responseType: "text"
        });
        if (response.status != 200) {
            throw `Failed to get protocol urls from ${url}`;
        }
        let base64 = response.data;
        let lines = utf8.GetString(Convert.FromBase64String(base64)).replace('\r', '').split('\n');
        return lines;
    };
    let updateSubscribers = async (urls: string[]) => {
        let subscriptions = data.subscriptions.filter(s => urls.includes(s.url));
        for (let subscription of subscriptions) {
            subscription.protocolUrls = await getProtocolUrlsFromSubscriptionUrl(subscription.url);
        }
        saveData();
        return subscriptions;
    };
    let startClient = async (configPath: string) => {
        if (Environment.OSVersion.Platform == PlatformID.Win32NT) {

        }
        else {
            // 给程序权限
            await cmdAsync(Environment.CurrentDirectory, `chmod +x ${programPath}`);
        }
        let processID = start({
            filePath: programPath,
            arguments: ["run", "-config", configPath]
        });
        return processID;
    };
    let startClientByProtocolUrl = async (protocolUrl: string) => {
        let configGuid = Guid.NewGuid().ToString();
        let configPath = Path.Combine(v2flyDirectory, `${configGuid}.json`);
        if (protocolUrl.startsWith("vmess://")) {
            v2flyConverter.generateVmessClientConfig(configPath, protocolUrl, vpnConfig.port);
        }
        else if (protocolUrl.startsWith("trojan://")) {
            v2flyConverter.generateTrojanClientConfig(configPath, protocolUrl, vpnConfig.port);
        }
        return startClient(configPath);
    };
    let stopClient = (processID: number) => {
        try {
            kill(processID);
        }
        catch {

        }
    };
    let ping = async (protocolUrls: string[]) => {
        let result = [] as PingResult[];

        let proxyPorts = netUtils.getAvailableTcpPorts(protocolUrls.length);
        // 在对应的端口上启动代理服务
        let proxyProcesses = [] as number[];
        for (let i = 0; i < protocolUrls.length; i++) {
            let proxyPort = proxyPorts[i];
            proxyProcesses.push(await startClientByProtocolUrl(protocolUrls[i]));
        }
        // 开始测试速度
        let configs = [] as pingConfig[];
        for (let i = 0; i < protocolUrls.length; i++) {
            configs.push({
                proxy: `127.0.0.1:${proxyPorts[i]}`,
                timeout: 5000,
                count: 1
            });
        }
        let pingsResult = await netUtils.pingsAsync(["http://google.com"], configs);
        // 停止代理服务
        for (let processID of proxyProcesses) {
            stopClient(processID);
        }
        for (let i = 0; i < protocolUrls.length; i++) {
            result.push({
                protocolUrl: protocolUrls[i],
                ping: pingsResult[i]
            });
        }
        return result;
    };
    let getCurrentProtocolUrl = () => {
        return data.currentProtocolUrl;
    };
    let switchToProtocolUrl = async (protocolUrl: string) => {
        let portNumber = Number(vpnConfig.port);
        if (isNaN(portNumber)) {
            throw "Invalid port";
        }
        if (currentProcessID > 0) {
            stopClient(currentProcessID);
        }
        currentProcessID = await startClientByProtocolUrl(protocolUrl);
        data.currentProtocolUrl = protocolUrl;
        saveData();
    };
    let downloadClient = async () => {
        axios.setDefaultProxy();
        let linuxUrl = "https://github.com/v2fly/v2ray-core/releases/download/v5.19.0/v2ray-linux-64.zip";
        let windowsUrl = "https://github.com/v2fly/v2ray-core/releases/download/v5.19.0/v2ray-windows-64.zip";
        // 根据平台自动下载
        let programName = Path.GetFileNameWithoutExtension(programPath);
        let zipPath = Path.Combine(v2flyDirectory, `${programName}.zip`);
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
        let zipExtractPath = Path.Combine(v2flyDirectory, `${programName}.extract`);
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
    let isProgramExists = () => {
        return File.Exists(programPath);
    };
    let initialize = async () => {
        if (isProgramExists() == false) {
            await downloadClient();
        }
    };
    self = {
        getSubscribers,
        addSubscribers,
        removeSubscribers,
        updateSubscribers,
        getConfig: () => vpnConfig,
        setConfig: (value) => {
            vpnConfig = value;
            saveData();
        },
        ping,
        getCurrentProtocolUrl,
        switchToProtocolUrl,
        initialize,
    };
    return self;
};

let v2flyManager = V2flyManager();

let main = async () => {

};