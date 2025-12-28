import { args, axios } from "../.tsc/context";
import { cmdAsync } from "../.tsc/staticContext";
import { Environment } from "../.tsc/System/Environment";
import { Path } from "../.tsc/System/IO/Path";

console.log(`args: ${args}`);
let GitManager = () => {
    let getHttpProxy = async () => {
        return (await cmdAsync(Environment.CurrentDirectory, "git config --get http.proxy")).output?.trim();
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

await main();