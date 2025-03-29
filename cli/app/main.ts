import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { File } from "../.tsc/System/IO/File";
import { Console } from "../.tsc/System/Console";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { args, script_path, setLoggerPath } from "../.tsc/Context";
import { cmdAsync, env, execAsync } from "../.tsc/staticContext";
import { Environment } from "../.tsc/System/Environment";

let main = async () => {
    console.log(`args: ${args}`);
    if (args.length < 1) {
        console.log("Usage: tscl app <cli-name> ...");
        return;
    }

    let utf8 = new UTF8Encoding(false);
    let cliName = args[0];
    let serviceName = cliName;
    let description = cliName;
    let script_directory = Path.GetDirectoryName(script_path);
    let homeDirectory = env("userprofile");
    let homeServiceNameDirectory = Path.Combine(homeDirectory, `.${serviceName}`);
    let homeServiceNameBinDirectory = Path.Combine(homeServiceNameDirectory, "bin");
    if (!Directory.Exists(homeServiceNameDirectory)) {
        Directory.CreateDirectory(homeServiceNameDirectory);
    }
    if (!Directory.Exists(homeServiceNameBinDirectory)) {
        Directory.CreateDirectory(homeServiceNameBinDirectory);
    }
    // 将tscl拷贝到.cliName/bin 目录
    let homeServiceNameBinProgramPath = Path.Combine(homeServiceNameBinDirectory, Path.GetFileName(Environment.ProcessPath));
    File.Copy(Environment.ProcessPath, homeServiceNameBinProgramPath, true);
    // 执行tscl
    let result = await execAsync({
        workingDirectory: homeServiceNameBinDirectory,
        filePath: homeServiceNameBinProgramPath,
        arguments: args
    });
    console.log(result);
};
await main();