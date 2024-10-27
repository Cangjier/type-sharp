import { args, cmdAsync, copyDirectory } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { zip } from "../.tsc/Cangjie/TypeSharp/System/zip";

let GitManager = () => {
    let getHttpProxy = async () => {
        let output = {} as { lines: string[] };
        await cmdAsync(Environment.CurrentDirectory, "git config --get http.proxy", output);
        if (output.lines && output.lines.length > 0) {
            return output.lines[0];
        }
        return "";
    };
    return {
        getHttpProxy
    };
};

let gitManager = GitManager();

let DotNetFrameworkManager = () => {
    let install4_0 = async () => {
        let downloadUrl = "https://www.nuget.org/api/v2/package/Microsoft.NETFramework.ReferenceAssemblies.net40/1.0.3";
        let downloadPath = Environment.CurrentDirectory + "/Microsoft.NETFramework.ReferenceAssemblies.net40.1.0.3.nupkg";
        let targetPath = "C:/Program Files (x86)/Reference Assemblies/Microsoft/Framework/.NETFramework/v4.0";
        console.log("Downloading Microsoft.NETFramework.ReferenceAssemblies.net40/1.0.3 ...");
        await axios.download(downloadUrl, downloadPath);
        await zip.extract(downloadPath, targetPath);
        console.log("Microsoft.NETFramework.ReferenceAssemblies.net40/1.0.3 has been installed.");
    };
    return {
        install4_0
    };
};

let dotNetFrameworkManager = DotNetFrameworkManager();
let main = async () => {
    let httpProxy = await gitManager.getHttpProxy();
    if (httpProxy != "") {
        axios.setProxy(httpProxy);
    }
    if (args.length < 2) {
        console.log("Usage: dotnetframework install 4.0");
        return;
    }
    let command = args[0];
    if (command == "install") {
        let version = args[1];
        if (version == "4.0") {
            await dotNetFrameworkManager.install4_0();
        }
    }
};

await main();
