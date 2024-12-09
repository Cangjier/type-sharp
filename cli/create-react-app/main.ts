import { args, cmd, script_path } from "../.tsc/context";
import { Path } from "../.tsc/System/IO/Path"
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { File } from '../.tsc/System/IO/File';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Directory } from '../.tsc/System/IO/Directory';
import { shell } from "../.tsc/Cangjie/TypeSharp/System/shell";
import { OperatingSystem } from '../.tsc/System/OperatingSystem';

let main = async () => {
    console.log(`create-react-app`);
    let script_directory = Path.GetDirectoryName(script_path);
    let templateDirectory = Path.Combine(script_directory, "template");
    let utf8 = new UTF8Encoding(false);
    let projectDirectory = args.length > 0 ? Path.GetFullPath(args[0]) : Directory.GetCurrentDirectory();
    console.log(`working in : ${projectDirectory}`);
    if (Directory.Exists(projectDirectory) == false) {
        Directory.CreateDirectory(projectDirectory);
    }
    let cmds = [
        "npm install create-next-app --global",
        `create-next-app . --ts --yes`,
        "npm install antd --save",
        "npm install @ant-design/icons --save",
        "npm install axios --save",
        "npm install react-router-dom --save"
    ];
    for (let i = 0; i < cmds.length; i++) {
        let item = cmds[i];
        console.log(item);
        let result = cmd(projectDirectory, item);
        if (result.exitCode != 0) {
            return;
        }
    }
    let envPath = Path.Combine(projectDirectory, ".ENV");
    File.WriteAllText(envPath, `PUBLIC_URL=${Path.GetFileName(projectDirectory)}`, utf8);
    console.log(`.ENV file created`);

    let nextConfigPath = Path.Combine(projectDirectory, "next.config.ts");
    let nextConfigTemplatePath = Path.Combine(templateDirectory, "next.config.ts");
    File.Copy(nextConfigTemplatePath, nextConfigPath, true);
};

await main();