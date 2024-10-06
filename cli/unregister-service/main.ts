import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory, script_path } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/Cangjie/TypeSharp/System/Server";
import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { zip } from "../.tsc/Cangjie/TypeSharp/System/zip";

console.log(args);
let help = () => {
    console.log("Usage: tscl run unregister-service <service-name>");
};
let main = async () => {
    if (args.length < 1) {
        help();
        return;
    }
    let utf8 = new UTF8Encoding(false);
    let name = args[0];
    let detectScript = `SERVICE="${name}.service"
    # 检查服务状态
    if systemctl is-active --quiet "$SERVICE"; then
        echo "$SERVICE is starting. Stopping it now..."
        systemctl stop "$SERVICE"
        echo "$SERVICE has been stopped."
    else
        echo "$SERVICE is not starting."
    fi`;
    let detectScriptPath = Path.Combine(Path.GetTempPath(), `${name}-detect.sh`);
    await File.WriteAllTextAsync(detectScriptPath, detectScript, utf8);
    let script_directory = Path.GetDirectoryName(script_path);
    await cmdAsync(script_directory, `sudo chmod +x ${detectScriptPath}`);
    await cmdAsync(script_directory, `sudo bash ${detectScriptPath}`);
    await cmdAsync(script_directory, `sudo systemctl disable ${name}.service`);
    await cmdAsync(script_directory, `sudo rm /etc/systemd/system/${name}.service`);
    await cmdAsync(script_directory, `sudo systemctl daemon-reload`);
};
await main();
