import { exec, execAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";

let main = async () => {
    let utf8 = new UTF8Encoding(false);
    await execAsync(Environment.ProcessPath, "run", "cs2ts");
    if (Path.GetDirectoryName(Environment.CurrentDirectory) == ".tsc") {
        // 如果是.tsc目录，则不需要创建main.ts
        return;
    }
    let mainTs = Path.Combine(Environment.CurrentDirectory, "main.ts");
    await File.WriteAllTextAsync(mainTs, `
import { exec, execAsync, cmd, cmdAsync, start, startCmd } from "./context";
import { Environment } from "./System/Environment";
import { Directory } from "./System/IO/Directory";
import { Path } from "./System/IO/Path";
import { File } from "./System/IO/File";
import { UTF8Encoding } from "./System/Text/UTF8Encoding";

let main=async()=>{
    let utf8=new UTF8Encoding(false);
};
await main();
`, utf8);
};

await main();
