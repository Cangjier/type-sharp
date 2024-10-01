import { exec, execAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";

let main = async () => {
    let utf8 = new UTF8Encoding(false);
    // 第一种情况，所在目录是.tsc，则需要输出cs2ts
    // 第二种情况，父级同级目录有.tsc，当前目录输出main.ts
    // 第三种情况，父级同级目录没有.tsc，则在当前目录输出cs2ts和main.ts

    if (Path.GetFileName(Environment.CurrentDirectory) == ".tsc") {
        console.log("Current directory is .tsc, run cs2ts");
        await execAsync(Environment.ProcessPath, "run", "cs2ts");
        return;
    }
    let mainTs = `import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory } from "./context";
import { Environment } from "./System/Environment";
import { Directory } from "./System/IO/Directory";
import { Path } from "./System/IO/Path";
import { File } from "./System/IO/File";
import { UTF8Encoding } from "./System/Text/UTF8Encoding";
import { Server } from "./TypeSharp/System/Server";
import { axios } from "../.tsc/TypeSharp/System/axios";
import { zip } from "../.tsc/TypeSharp/System/zip";

console.log(args);
let main=async()=>{
    let utf8=new UTF8Encoding(false);
};
await main();
    `;
    let parentDirectories = Directory.GetDirectories(Path.GetDirectoryName(Environment.CurrentDirectory));
    if (parentDirectories.findIndex(item => Path.GetFileName(item) == ".tsc") != -1) {
        let mainTsPath = Path.Combine(Environment.CurrentDirectory, "main.ts");
        if (File.Exists(mainTsPath)) {
            File.Copy(mainTsPath, Path.Combine(Environment.CurrentDirectory, "main.ts.bak"), true);
        }
        await File.WriteAllTextAsync(mainTsPath, mainTs.replace("./", "../.tsc/"), utf8);
    }
    else {
        let mainTsPath = Path.Combine(Environment.CurrentDirectory, "main.ts");
        if (File.Exists(mainTsPath)) {
            File.Copy(mainTsPath, Path.Combine(Environment.CurrentDirectory, "main.ts.bak"), true);
        }
        await File.WriteAllTextAsync(mainTsPath, mainTs, utf8);
    }
};

await main();
