import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/TypeSharp/System/Server";

console.log(args);
let main = async () => {
    
    let programId = "FE8826DC-18F9-411A-A851-5DC68A12F5BF";
    let programPath;
    if (Environment.OSVersion == "Windows_NT") {
        programPath = Path.Combine(Path.GetTempPath(), `${programId}.exe`);
    }
    else {
        programPath = Path.Combine(Path.GetTempPath(), programId);
    }
    if (File.Exists(programPath) == false) {
        //https://github.com/v2fly/v2ray-core/releases/download/v5.18.0/v2ray-linux-64.zip
        //https://github.com/v2fly/v2ray-core/releases/download/v5.18.0/v2ray-windows-64.zip
    }
};
await main();
