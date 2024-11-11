import { args, cmd, script_path } from "../.tsc/context";
import { Path } from "../.tsc/System/IO/Path"
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { File } from '../.tsc/System/IO/File';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Directory } from '../.tsc/System/IO/Directory';

let main = () => {
    console.log(`create-react-app`);
    let script_directory = Path.GetDirectoryName(script_path);
    let templateDirectory = Path.Combine(script_directory, "template");
    let utf8 = new UTF8Encoding(false);
    let projectDirectory = args.length > 0 ? Path.GetFullPath(args[0]) : Directory.GetCurrentDirectory();
    console.log(`working in : ${projectDirectory}`);
    if (Directory.Exists(projectDirectory) == false) {
        Directory.CreateDirectory(projectDirectory);
    }
    console.log(`npm install create-react-app --global`);
    if (cmd(projectDirectory, `npm install create-react-app --global`).exitCode != 0) {
        console.log(`npm install create-react-app --global failed`);
        return -1;
    }
    console.log(`create-react-app . --template typescript`);
    if (cmd(projectDirectory, `create-react-app . --template typescript`).exitCode != 0) {
        return -1;
    }
    console.log(`npm install antd --save`);
    if (cmd(projectDirectory, `npm install antd --save`).exitCode != 0) {
        console.log(`npm install antd --save failed`);
        return -1;
    }
    console.log(`npm install @ant-design/icons --save`);
    if (cmd(projectDirectory, `npm install @ant-design/icons --save`).exitCode != 0) {
        console.log(`npm install @ant-design/icons --save failed`);
        return -1;
    }
    console.log(`npm install axios --save`);
    if (cmd(projectDirectory, `npm install axios --save`).exitCode != 0) {
        console.log(`npm install axios --save failed`);
        return -1;
    }
    console.log(`npm install react-router-dom --save`);
    if (cmd(projectDirectory, `npm install react-router-dom --save`).exitCode != 0) {
        console.log(`npm install react-router-dom --save failed`);
        return -1;
    }
    let envPath = Path.Combine(projectDirectory, ".ENV");
    File.WriteAllText(envPath, `PUBLIC_URL=${Path.GetFileName(projectDirectory)}`, utf8);
    console.log(`.ENV file created`);
    let indexTsPath = Path.Combine(projectDirectory, "src", "index.tsx");
    let indexTsTemplatePath = Path.Combine(templateDirectory, "index.tsx");
    File.Copy(indexTsTemplatePath, indexTsPath, true);
    return 0;
};

main();