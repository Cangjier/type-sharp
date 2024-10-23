import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { args, cmdAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Path } from "../.tsc/System/IO/Path";

console.log(`args: ${args}`);
let GitManager = () => {
    let getHttpProxy = async () => {
        let output = {} as { lines: string[] };
        await cmdAsync(Environment.CurrentDirectory, "git config --get http.proxy", output);
        if (output.lines && output.lines.length > 0) {
            return output.lines[0];
        }
        return "";
    };
    return { getHttpProxy };
}

let help = () => {
    console.log(`Usage: download <url>`);
};

let main = async () => {
    if (args.length < 1) {
        help();
        return;
    }
    let gitManager = GitManager();
    let proxy = await gitManager.getHttpProxy();
    if (proxy != "") {
        axios.setProxy(proxy);
    }
    var url = args[0];
    let downloadPath = Path.Combine(Environment.CurrentDirectory, Path.GetFileName(url));
    console.log(`Downloading ${url} to ${downloadPath}`);
    await axios.download(url, downloadPath);
    console.log(`Downloaded ${downloadPath}`);
};

main();