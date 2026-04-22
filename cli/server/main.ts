import { Server } from "../.tsc/Cangjie/TypeSharp/System/Server";
import { args, script_path } from "../.tsc/Context";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { env } from "../.tsc/staticContext";

let main = async () => {
    if (args.length == 0) {
        throw "server name is required";
    }
    let serverName = args[0];
    let server = new Server();
    let homeDirectory = env("HOME");
    let serverDirectory = Path.Combine(homeDirectory, ".server", serverName);
    if (Directory.Exists(serverDirectory) == false) {
        Directory.CreateDirectory(serverDirectory);
    }
    let staticDirectory = Path.Combine(serverDirectory, "front");
    if (Directory.Exists(staticDirectory) == false) {
        Directory.CreateDirectory(staticDirectory);
    }
    server.useStatic(staticDirectory);
    let pluginsDirectory = Path.Combine(serverDirectory, "plugins");
    if (Directory.Exists(pluginsDirectory) == false) {
        Directory.CreateDirectory(pluginsDirectory);
    }
    server.usePlugins(pluginsDirectory,true);
    await server.start([8080]);
};

await main();