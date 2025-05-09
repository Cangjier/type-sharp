import { args, script_path } from "../.tsc/Context";
import { cmd } from "../.tsc/staticContext";
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
    let oldProjectFiles = Directory.GetFiles(projectDirectory);
    let oldProjectDirectories = Directory.GetDirectories(projectDirectory).filter(item => Path.GetFileName(item) != ".git");
    if (oldProjectFiles.length > 0 || oldProjectDirectories.length > 0) {
        console.log("Please remove files from project directory before running this script.");
        oldProjectFiles.forEach(item => {
            console.log(item);
        });
        oldProjectDirectories.forEach(item => {
            console.log(item);
        });
        return;
    }

    let cmds = [
        "npm install create-vite@latest --global",
        `create-vite . --template react-ts`,
        "npm install antd --save",
        "npm install @ant-design/icons --save",
        "npm install axios --save",
        "npm install react-router-dom --save",
        "npm i --save-dev @types/node",
        "npm install vite-plugin-svgr --save"
    ];
    for (let i = 0; i < cmds.length; i++) {
        let item = cmds[i];
        console.log(item);
        let result = cmd(projectDirectory, item);
        if (result.exitCode != 0) {
            return;
        }
    }

    let envPath = Path.Combine(projectDirectory, ".env");
    File.WriteAllText(envPath, `VITE_PUBLIC_URL=${Path.GetFileName(projectDirectory)}`, utf8);
    console.log(`.ENV file created`);

    let mainTsPath = Path.Combine(projectDirectory, "src", "main.tsx");
    let mainTsTemplatePath = Path.Combine(templateDirectory, "main.tsx");
    File.Copy(mainTsTemplatePath, mainTsPath, true);

    let tsconfigAppPath = Path.Combine(projectDirectory, "tsconfig.app.json");
    let tsconfigApp = Json.Load(tsconfigAppPath);
    tsconfigApp["compilerOptions"]["noUnusedLocals"] = false;
    tsconfigApp["compilerOptions"]["noUnusedParameters"] = false;
    tsconfigApp["compilerOptions"]["erasableSyntaxOnly"] = undefined;
    tsconfigApp["compilerOptions"]["verbatimModuleSyntax"] = undefined;
    (tsconfigApp as Json).Save(tsconfigAppPath);

    let tsconfigNodePath = Path.Combine(projectDirectory, "tsconfig.node.json");
    let tsconfigNode = Json.Load(tsconfigNodePath);
    tsconfigNode["compilerOptions"]["noUnusedLocals"] = false;
    tsconfigNode["compilerOptions"]["noUnusedParameters"] = false;
    tsconfigNode["compilerOptions"]["erasableSyntaxOnly"] = undefined;
    tsconfigNode["compilerOptions"]["verbatimModuleSyntax"] = undefined;
    (tsconfigNode as Json).Save(tsconfigNodePath);

    let srcDirectory = Path.Combine(projectDirectory, "src");
    cmd(srcDirectory, "git clone https://github.com/Cangjier/natived.git");

    let appTsxPath = Path.Combine(srcDirectory, "App.tsx");
    let appTsxTemplatePath = Path.Combine(templateDirectory, "App.tsx");
    File.Copy(appTsxTemplatePath, appTsxPath, true);

    let svgsDirectory = Path.Combine(srcDirectory, "svgs");
    Directory.CreateDirectory(svgsDirectory);

    let viteConfigTSPath = Path.Combine(projectDirectory, "vite.config.ts");
    let viteConfigTSTemplatePath = Path.Combine(templateDirectory, "vite.config.ts");
    File.Copy(viteConfigTSTemplatePath, viteConfigTSPath, true);
};

await main();