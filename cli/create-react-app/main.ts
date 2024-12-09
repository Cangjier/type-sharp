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
    let sh = shell.start({
        filePath: (OperatingSystem.IsLinux() ? "bash" : "cmd"),
        workingDirectory: projectDirectory
    });
    console.log(`working in : ${projectDirectory}`);
    if (Directory.Exists(projectDirectory) == false) {
        Directory.CreateDirectory(projectDirectory);
    }
    sh.writeLine(`npm install create-react-app --global & echo ---`);
    await sh.readLinesWhen(item => {
        if (item == "---") {
            return true;
        }
        console.log(item);
        return false;
    });
    sh.writeLine(`create-react-app. --template typescript & echo ---`);
    await sh.readLinesWhen(item => {
        if (item == "---") {
            return true;
        }
        console.log(item);
        return false;
    });
    sh.writeLine(`npm install antd --save & echo ---`);
    await sh.readLinesWhen(item => {
        if (item == "---") {
            return true;
        }
        console.log(item);
        return false;
    });
    console.log(`npm install @ant-design/icons --save`);
    sh.writeLine(`npm install @ant-design/icons --save & echo ---`);
    await sh.readLinesWhen(item => {
        if (item == "---") {
            return true;
        }
        console.log(item);
        return false;
    });
    console.log(`npm install axios --save`);
    sh.writeLine(`npm install axios --save & echo ---`);
    await sh.readLinesWhen(item => {
        if (item == "---") {
            return true;
        }
        console.log(item);
        return false;
    });
    console.log(`npm install react-router-dom --save`);
    sh.writeLine(`npm install react-router-dom --save & echo ---`);
    await sh.readLinesWhen(item => {
        if (item == "---") {
            return true;
        }
        console.log(item);
        return false;
    });
    let envPath = Path.Combine(projectDirectory, ".ENV");
    File.WriteAllText(envPath, `PUBLIC_URL=${Path.GetFileName(projectDirectory)}`, utf8);
    console.log(`.ENV file created`);
    let indexTsPath = Path.Combine(projectDirectory, "src", "index.tsx");
    let indexTsTemplatePath = Path.Combine(templateDirectory, "index.tsx");
    File.Copy(indexTsTemplatePath, indexTsPath, true);
    return 0;
};

await main();