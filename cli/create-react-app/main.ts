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
        "npm install vite@latest --global",
        "npm install create-vite@latest --global",
        `create-vite . --template react-ts`,
        "npm install antd --save",
        "npm install @ant-design/icons --save",
        "npm install axios --save",
        // "npm install react-router-dom --save"
    ];
    for (let i = 0; i < cmds.length; i++) {
        let item = cmds[i];
        console.log(item);
        let result = cmd(projectDirectory, item);
        if (result.exitCode != 0) {
            return;
        }
    }

    // let nextConfigPath = Path.Combine(projectDirectory, "next.config.ts");
    // let nextConfig = File.ReadAllText(nextConfigPath, utf8);
    // nextConfig = nextConfig.replace('__PUBLIC_URL__', Path.GetFileName(projectDirectory));
    // let nextConfigTemplatePath = Path.Combine(templateDirectory, "next.config.ts");
    // File.WriteAllText(nextConfigTemplatePath, nextConfig, utf8);
};

await main();