import { args, exec, execAsync, cmd, cmdAsync, start, startCmd, copyDirectory } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Server } from "../.tsc/Cangjie/TypeSharp/System/Server";
import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { zip } from "../.tsc/Cangjie/TypeSharp/System/zip";
import { Regex } from "../.tsc/System/Text/RegularExpressions/Regex";
import { Console } from "../.tsc/System/Console";

let help = () => {
    console.log("Usage: tscl run rm <path> <regex>");
};
let main = async () => {
    if (args.length < 2) {
        help();
        return;
    }
    let utf8 = new UTF8Encoding(false);
    let path = args[0];
    let regex = new Regex(args[1]);
    let files = Directory.GetFiles(path);
    let toDelete = [] as string[];
    for (let file of files) {
        if (regex.IsMatch(file)) {
            console.log(`To Delete ${file}`);
            toDelete.push(file);
        }
    }
    console.log(`Total ${toDelete.length} files to delete.`);
    console.log(`Are you sure to delete these files? (Y/N)`);
    let answer = Console.ReadLine();
    if (answer.toLowerCase() == "y") {
        let index = 0;
        for (let file of toDelete) {
            console.log(`Deleting ${index++}/${toDelete.length} ${file}`);
            try {
                File.Delete(file);
            }
            catch (e) {
                console.log(`Failed to delete ${file}`);
            }
        }
    }
};
await main();
