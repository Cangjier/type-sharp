import { AgentApplication } from "../.tsc/Cangjie/TypeSharp/System/AgentApplication";
import { args, script_path } from "../.tsc/Context";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";


let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        if (i + 1 < args.length) {
            let value = args[i + 1];
            parameters[key] = value;
            i++;
        }
        else {
            parameters[key] = "true";
        }
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(`parameters: ${parameters}`);
let script_directory = Path.GetDirectoryName(script_path);
let main = async () => {
    let app = new AgentApplication();
    let pluginDirectory = Path.Combine(script_directory, "plugins");
    if (Directory.Exists(pluginDirectory) == false) {
        Directory.CreateDirectory(pluginDirectory);
    }
    app.use(pluginDirectory);
    console.log(`Plugin directory: ${pluginDirectory}`);
    let url = parameters["url"];
    if (url == undefined) {
        throw `url is required`;
    }
    await app.start(url);
};

await main();