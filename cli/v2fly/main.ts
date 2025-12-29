import { args, axios, script_path } from "../.tsc/context";
import { exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory, deleteDirectory, env, kill, md5 } from "../.tsc/staticContext";
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
import { Console } from "../.tsc/System/Console";
import { ArgsRouter } from "../.tsc/TidyHPC/Routers/Args/ArgsRouter";
import { Task } from "../.tsc/System/Threading/Tasks/Task";
import { stringUtils } from "../.tsc/Cangjie/TypeSharp/System/stringUtils";
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
    // 更新订阅地址的base64内容
    updateSubscriberByBase64Content: (url: string, base64Content: string) => Promise<void>,
    // 测试协议地址的延迟
    ping: (protocolUrls: string[]) => Promise<PingResult[]>,
    // 获取当前协议地址
    getCurrentProtocolUrl: () => string,
    // 切换到协议地址
    switchToProtocolUrl: (protocolUrl: string) => Promise<void>,
    // 获取当前配置
    getConfig: () => VPNConfig,
    // 设置当前配置
    setConfig: (config: VPNConfig) => void,
    initialize: () => Promise<void>,
    switchToFastestProtocolUrl: () => Promise<void>,
    restart: () => Promise<void>
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
        let addressStart = url.indexOf('@') + 1;
        let addressEnd = url.indexOf(':', addressStart);
        let address = url.substring(addressStart, addressEnd);
        let outportStart = addressEnd + 1;
        let outportEnd = url.indexOf('?', outportStart);
        let outport = url.substring(outportStart, outportEnd);
        let dict = {} as { [key: string]: any };
        let queryStart = outportEnd + 1;
        let queryEnd = url.indexOf('#', queryStart);
        let query = url.substring(queryStart, queryEnd);
        let titleStart = queryEnd + 1;
        let title = url.substring(titleStart);
        let pairs = query.split('&');
        for (let pair of pairs) {
            let key = pair.substring(0, pair.indexOf('='));
            let value = pair.substring(pair.indexOf('=') + 1);
            dict[key] = value;
        }
        let allowInsecure = dict["allowInsecure"] ?? "0";
        if (allowInsecure == "1") {
            allowInsecure = "true";
        }
        else {
            allowInsecure = "false";
        }
        let network = dict["type"] ?? "tcp";
        let sni = dict["sni"] ?? "null";
        if (sni != "null") {
            sni = `"${sni}"`;
        }
        let peer = dict["peer"] ?? "null";
        if (peer != "null") {
            peer = `"${peer}"`;
        }
        console.log({
            title,
            password,
            address,
            port,
            outport,
            network,
            allowInsecure,
            sni,
            peer
        });
        let config = template.replace("<password>", password);
        config = config.replace("<address>", address);
        config = config.replace("<in-port>", port);
        config = config.replace("<output-port>", outport);
        config = config.replace("<network>", network);
        config = config.replace("<allowInsecure>", allowInsecure);
        config = config.replace("<sni>", sni);
        config = config.replace("<peer>", peer);
        console.log(`config=${config}`);
        File.WriteAllText(configPath, config, utf8);
    };

    let generateHysteria2ClientConfig = (configPath: string, url: string, port: string) => {
        let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'hysteria2-client.json');
        let template = File.ReadAllText(templatePath, utf8);
        // url such as hysteria2://9c008fca-68e1-3ab4-b821-0071ce25ffdb@4.189.34.160:443/?insecure=0&sni=jprh.cloud-services.top#%F0%9F%87%AF%F0%9F%87%B5%20%E6%97%A5%E6%9C%AC.H%20%7C%20%E7%9B%B4%E8%BF%9E%20%7C%20Hysteria2
        url = url.substring("hysteria2://".length);
        let password = url.substring(0, url.indexOf('@'));
        let addressStart = url.indexOf('@') + 1;
        let addressEnd = url.indexOf(':', addressStart);
        let address = url.substring(addressStart, addressEnd);
        let outportStart = addressEnd + 1;
        let outportEnd = url.indexOf('?', outportStart);
        let outport = stringUtils.trimEnd(url.substring(outportStart, outportEnd), "/");
        let dict = {} as { [key: string]: any };
        let queryStart = outportEnd + 1;
        let queryEnd = url.indexOf('#', queryStart);
        let query = url.substring(queryStart, queryEnd);
        let titleStart = queryEnd + 1;
        let title = url.substring(titleStart);
        let pairs = query.split('&');
        for (let pair of pairs) {
            let key = pair.substring(0, pair.indexOf('='));
            let value = pair.substring(pair.indexOf('=') + 1);
            dict[key] = value;
        }
        let sni = dict["sni"] ?? "null";
        if (sni != "null") {
            sni = `"${sni}"`;
        }
        let insecure = dict["insecure"] ?? "0";
        console.log({
            title,
            password,
            address,
            port,
            outport,
            sni
        });
        let config = template.replace("<password>", password);
        config = config.replace("<address>", address);
        config = config.replace("\"<in-port>\"", port);
        config = config.replace("\"<output-port>\"", outport);
        config = config.replace("\"<sni>\"", sni);
        console.log(`config=${config}`);
        File.WriteAllText(configPath, config, utf8);
    };

    let generateVlessClientConfig = (configPath: string, url: string, port: string) => {
        let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'hysteria2-client.json');
        let template = File.ReadAllText(templatePath, utf8);
        // url such as vless://9c008fca-68e1-3ab4-b821-0071ce25ffdb@o8ww0cugspqym2vxtdctmxf5xxugtqpxkru.japaneast.azurecontainer.io:443?type=tcp&encryption=none&host=&path=&headerType=none&quicSecurity=none&serviceName=&security=reality&flow=xtls-rprx-vision&fp=chrome&insecure=0&sni=www.airbnb.jp&pbk=U5hFcZfRCdnmWmEnWvgtmGdtFerzmHSqTxXDVPJ2hUc&sid=b4774abe#%E5%89%A9%E4%BD%99%E6%B5%81%E9%87%8F%EF%BC%9A413.83%20GB
        url = url.substring("vless://".length);
        let id = url.substring(0, url.indexOf('@'));
        let addressStart = url.indexOf('@') + 1;
        let addressEnd = url.indexOf(':', addressStart);
        let address = url.substring(addressStart, addressEnd);
        let outportStart = addressEnd + 1;
        let outportEnd = url.indexOf('?', outportStart);
        let outport = stringUtils.trimEnd(url.substring(outportStart, outportEnd), "/");
        let dict = {} as { [key: string]: any };
        let queryStart = outportEnd + 1;
        let queryEnd = url.indexOf('#', queryStart);
        let query = url.substring(queryStart, queryEnd);
        let titleStart = queryEnd + 1;
        let title = url.substring(titleStart);
        let pairs = query.split('&');
        for (let pair of pairs) {
            let key = pair.substring(0, pair.indexOf('='));
            let value = pair.substring(pair.indexOf('=') + 1);
            dict[key] = value;
        }
        let type = dict["type"] ?? "tcp";
        let encryption = dict["encryption"] ?? "none";
        let host = dict["host"] ?? "";
        let path = dict["path"] ?? "";
        let headerType = dict["headerType"] ?? "none";
        let quicSecurity = dict["quicSecurity"] ?? "none";
        let serviceName = dict["serviceName"] ?? "";
        let security = dict["security"] ?? "reality";
        let flow = dict["flow"] ?? "xtls-rprx-vision";
        let fp = dict["fp"] ?? "chrome";
        let insecure = dict["insecure"] ?? "0";
        let sni = dict["sni"] ?? "null";
        let pbk = dict["pbk"] ?? "";
        let sid = dict["sid"] ?? "";
        console.log({
            title,
            id,
            address,
            port,
            outport,
            type,
            encryption,
            host,
            path,
            headerType,
            quicSecurity,
            serviceName,
            security,
            flow,
            fp,
            insecure,
            sni,
            pbk,
            sid
        });
        let config = template.replace("<id>", id);
        config = config.replace("<address>", address);
        config = config.replace("\"<in-port>\"", port);
        config = config.replace("\"<output-port>\"", outport);
        config = config.replace("<flow>", flow);
        config = config.replace("<encryption>", encryption);
        config = config.replace("<sni>", sni);
        config = config.replace("<network>", type);
        config = config.replace("<security>", security);
        config = config.replace("<fingerprint>", fp);
        config = config.replace("<password>", "");
        config = config.replace("<shortId>", sid);
        config = config.replace("<mldsa65Verify>", pbk);
        config = config.replace("<spiderX>", path);
        console.log(`config=${config}`);
        File.WriteAllText(configPath, config, utf8);
    };

    let generateVmessServerConfig = (configPath: string, port: string) => {
        let templatePath = Path.Combine(Path.GetDirectoryName(script_path), 'vmess-server.json');
        let template = File.ReadAllText(templatePath, utf8);
        let config = template.replace("<port>", port);
        File.WriteAllText(configPath, config, utf8);
    };

    return {
        generateVmessClientConfig,
        generateTrojanClientConfig,
        generateHysteria2ClientConfig,
        generateVlessClientConfig,
        generateVmessServerConfig,
       
    };
};

let v2flyConverter = V2flyConverter();

let V2flyManager = () => {
    let programPath = Path.Combine(v2flyDirectory, "v2ray");
    if (Environment.OSVersion.Platform == PlatformID.Win32NT) {
        programPath += ".exe";
    }
    let v2flyConfigsDirectory = Path.Combine(v2flyDirectory, "configs");
    if (!Directory.Exists(v2flyConfigsDirectory)) {
        Directory.CreateDirectory(v2flyConfigsDirectory);
    }
    let self = {} as IV2flyManager;
    let vpnConfig = {
        port: "7897"
    } as VPNConfig;
    let vpnConfigPath = Path.Combine(v2flyDirectory, "vpn-config.json");
    let data = {
        subscriptions: [],
        currentProtocolUrl: ""
    } as {
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
            responseType: "text",
            headers: {
                "User-Agent": "v2ray"
            }
        });
        if (response.status != 200) {
            throw `Failed to get protocol urls from ${url}`;
        }
        let base64 = response.data;
        let lines = utf8.GetString(Convert.FromBase64String(base64)).replace('\r', '').split('\n').filter(s => s.trim() != "");
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
    let updateSubscriberByBase64Content = async (url: string, base64Content: string) => {
        let subscription = data.subscriptions.find(s => s.url == url);
        if (subscription) {
            subscription.protocolUrls = utf8.GetString(Convert.FromBase64String(base64Content)).replace('\r', '').split('\n').filter(s => s.trim() != "");
        }
        saveData();
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
        let configID = md5(protocolUrl);
        let configPath = Path.Combine(v2flyDirectory, "configs", `${configID}.json`);
        if (protocolUrl.startsWith("vmess://")) {
            v2flyConverter.generateVmessClientConfig(configPath, protocolUrl, vpnConfig.port);
        }
        else if (protocolUrl.startsWith("trojan://")) {
            v2flyConverter.generateTrojanClientConfig(configPath, protocolUrl, vpnConfig.port);
        }
        else if (protocolUrl.startsWith("hysteria2://")) {
            v2flyConverter.generateHysteria2ClientConfig(configPath, protocolUrl, vpnConfig.port);
        }
        else if (protocolUrl.startsWith("vless://")) {
            v2flyConverter.generateVlessClientConfig(configPath, protocolUrl, vpnConfig.port);
        }
        return await startClient(configPath);
    };
    let startClientByProtocolUrlAndPort = async (protocolUrl: string, port: string) => {
        let configID = md5(protocolUrl);
        let configPath = Path.Combine(v2flyDirectory, "configs", `${configID}.json`);
        if (protocolUrl.startsWith("vmess://")) {
            v2flyConverter.generateVmessClientConfig(configPath, protocolUrl, port);
        }
        else if (protocolUrl.startsWith("trojan://")) {
            v2flyConverter.generateTrojanClientConfig(configPath, protocolUrl, port);
        }
        else if (protocolUrl.startsWith("hysteria2://")) {
            v2flyConverter.generateHysteria2ClientConfig(configPath, protocolUrl, port);
        }
        else if (protocolUrl.startsWith("vless://")) {
            v2flyConverter.generateVlessClientConfig(configPath, protocolUrl, port);
        }
        return await startClient(configPath);
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
            proxyProcesses.push(await startClientByProtocolUrlAndPort(protocolUrls[i], proxyPort.toString()));
        }
        // 等待服务启动
        await Task.Delay(1000);
        // 开始测试速度
        let configs = [] as pingConfig[];
        for (let i = 0; i < protocolUrls.length; i++) {
            configs.push({
                proxy: `http://127.0.0.1:${proxyPorts[i]}/`,
                timeout: 5000,
                count: 3
            });
        }
        console.log(`ping configs: ${configs}`)
        let pingsResult = await netUtils.pingsAsync(["http://google.com"], configs);
        console.log(`pingsResult: ${pingsResult}`);
        console.log(`stop: ${proxyProcesses}`);
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
        if (vpnConfig.port != undefined && vpnConfig.port != "" && data.currentProtocolUrl && data.currentProtocolUrl != "") {
            await switchToProtocolUrl(data.currentProtocolUrl);
        }
    };
    let switchToFastestProtocolUrl = async () => {
        let protocolUrls = getSubscribers().map(x => x.protocolUrls).flat();
        if (protocolUrls.length == 0) {
            return;
        }
        let result = await ping(protocolUrls);
        result = result.filter(item => item.ping > 0);
        result.sort((a, b) => a.ping - b.ping);
        console.log(`switch to fastest protocol url: ${result[0].protocolUrl}, ping: ${result[0].ping}`);
        await switchToProtocolUrl(result[0].protocolUrl);
    };
    let restart = async () => {
        let protocolUrl = getCurrentProtocolUrl();
        if (protocolUrl != undefined && protocolUrl != "") {
            switchToProtocolUrl(protocolUrl);
        }
    };
    self = {
        getSubscribers,
        addSubscribers,
        removeSubscribers,
        updateSubscribers,
        updateSubscriberByBase64Content,
        getConfig: () => vpnConfig,
        setConfig: (value) => {
            vpnConfig = value;
            saveData();
        },
        ping,
        getCurrentProtocolUrl,
        switchToProtocolUrl,
        initialize,
        switchToFastestProtocolUrl,
        restart
    };
    return self;
};

let v2flyManager = V2flyManager();

let main_debug = async () => {
    await v2flyManager.initialize();
    while (true) {
        let line = Console.ReadLine();
        let lineItems = line.split(" ");
        if (lineItems.length == 0) {
            continue;
        }
        let command = lineItems[0];
        if (command == "subscribe") {
            let url = lineItems[1];
            v2flyManager.addSubscribers([url]);
            let updateResult = await v2flyManager.updateSubscribers([url]);
            console.log(updateResult);
            console.log('-'.padEnd(32, '-'));
        }
        else if (command == "list") {
            console.log(v2flyManager.getSubscribers());
            console.log('-'.padEnd(32, '-'));
        }
        else if (command == "use") {
            let url = lineItems[1];
            await v2flyManager.switchToProtocolUrl(url);
            console.log('-'.padEnd(32, '-'));
        }
        else if (command == "port") {
            let port = lineItems[1];
            v2flyManager.setConfig({ ...v2flyManager.getConfig(), port });
            console.log('-'.padEnd(32, '-'));
        }
        else if (command == "ping") {
            let protocolUrls = v2flyManager.getSubscribers().map(x => x.protocolUrls).flat();
            let result = await v2flyManager.ping(protocolUrls);
            console.log(result);
            console.log('-'.padEnd(32, '-'));
        }
        else if (command == "fast") {
            await v2flyManager.switchToFastestProtocolUrl();
            console.log('-'.padEnd(32, '-'));
        }
    }
};

const uiDirectory = Path.Combine(v2flyDirectory, "v2fly-ui");
const uiDistDirectory = Path.Combine(uiDirectory, "dist");
let initializeUI = async () => {
    let uiGitDirectory = Path.Combine(uiDirectory, ".git");
    // 获取最新的UI代码
    if (Directory.Exists(uiGitDirectory) == false) {
        await cmdAsync(v2flyDirectory, "git clone https://github.com/Cangjier/v2fly-ui.git --depth=1");
    }
    else {
        await cmdAsync(uiDirectory, "git pull");
    }
    // npm 安装
    await cmdAsync(uiDirectory, "npm install");
    // 构建UI代码
    await cmdAsync(uiDirectory, "npm run build");
};

let main = async () => {
    console.log(`initializing v2fly`);
    await v2flyManager.initialize();
    console.log(`initializing server`);
    let server = new Server();
    server.use("/api/v1/get_subscribers", async () => {
        return v2flyManager.getSubscribers();
    });
    server.use("/api/v1/add_subscribers", async (subscribers: string[]) => {
        v2flyManager.addSubscribers(subscribers);
    });
    server.use("/api/v1/remove_subscribers", async (subscribers: string[]) => {
        v2flyManager.removeSubscribers(subscribers);
    });
    server.use("/api/v1/update_subscribers", async (subscribers: string[]) => {
        return await v2flyManager.updateSubscribers(subscribers);
    });
    server.use("/api/v1/update_subscriber_by_base64_content", async (url: string, base64Content: string) => {
        await v2flyManager.updateSubscriberByBase64Content(url, base64Content);
    });
    server.use("/api/v1/switch_to_protocol_url", async (protocolUrl: string) => {
        await v2flyManager.switchToProtocolUrl(protocolUrl);
    });
    server.use("/api/v1/ping", async (protocolUrls: string[]) => {
        return await v2flyManager.ping(protocolUrls);
    });
    server.use("/api/v1/switch_to_fastest_protocol_url", async () => {
        await v2flyManager.switchToFastestProtocolUrl();
    });
    server.use("/api/v1/get_current_protocol_url", async () => {
        return v2flyManager.getCurrentProtocolUrl();
    });
    server.use("/api/v1/get_config", async () => {
        return v2flyManager.getConfig();
    });
    server.use("/api/v1/set_config", async (config: any) => {
        v2flyManager.setConfig(config);
    });
    server.use("/api/v1/restart", async () => {
        await v2flyManager.restart();
    });
    console.log(`initializing v2fly-ui`);
    await initializeUI();
    server.useStatic(uiDistDirectory);

    let uiPort = parameters["ui-port"] ?? "7898";
    console.log(`v2fly-ui started on port ${uiPort}`);
    await server.start(Number(uiPort));
};

await main();