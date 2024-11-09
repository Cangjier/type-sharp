import { args, cmd, script_path } from "../.tsc/context";
import { Path } from "../.tsc/System/IO/Path"
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { File } from '../.tsc/System/IO/File';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Directory } from '../.tsc/System/IO/Directory';

let main = () => {
    console.log(`create-react-component`);
    console.log(`script_path : ${script_path}`);
    if (script_path.startsWith("http")) {
        console.log(`Please download script to local and run it.`);
        return -1;
    }
    let script_directory = Path.GetDirectoryName(script_path);
    let templateDirectory = Path.Combine(script_directory, "template");
    let utf8 = new UTF8Encoding(false);
    let projectDirectory = args.length > 0 ? Path.GetFullPath(args[0]) : Directory.GetCurrentDirectory();
    console.log(`working in : ${projectDirectory}`);
    if (Directory.Exists(projectDirectory) == false) {
        Directory.CreateDirectory(projectDirectory);
    }
    console.log(`npm init -y`);
    if (cmd(projectDirectory, `npm init -y`).exitCode != 0) {
        return -1;
    }
    let packagePath = Path.Combine(projectDirectory, "package.json");
    let packageJson = Json.Load(packagePath);
    packageJson["author"] = "Demo";
    packageJson["scripts"] = {
        "build": "webpack --config webpack.config.js",
        "prepublishOnly": "npm run build"
    };
    packageJson["main"] = "build/index.js";
    packageJson["files"] = [
        "build"
    ];
    packageJson.Save(packagePath);
    let packages = [
        "react",
        "react-dom",
        "typescript",
        "@types/react",
        "@types/react-dom",
        "webpack",
        "webpack-cli",
        "ts-loader",
        "@svgr/webpack",
        "url-loader",
        "file-loader",
        "webpack-obfuscator"
    ];
    console.log(`npm install ${packages.join(" ")} --save-dev`);
    let installScript = `npm install ${packages.join(" ")} --save-dev`;
    if (cmd(projectDirectory, installScript).exitCode != 0) {
        return -1;
    }
    console.log(`modify tsconfig.json`);
    let tsConfigPath = Path.Combine(projectDirectory, "tsconfig.json");
    let tsConfig = File.Exists(tsConfigPath) ?
        Json.Load(tsConfigPath) : {
            "compilerOptions": {
                "outDir": "build",
                "module": "commonjs",
                "target": "es5",
                "lib": [
                    "es6",
                    "dom"
                ],
                "sourceMap": true,
                "allowJs": true,
                "jsx": "react-jsx",
                "moduleResolution": "node",
                "rootDir": "src",
                "forceConsistentCasingInFileNames": true,
                "noImplicitReturns": false,
                "noImplicitThis": true,
                "noImplicitAny": true,
                "strictNullChecks": true,
                "noUnusedLocals": false,
                "declaration": true,
                "allowSyntheticDefaultImports": true,
                "experimentalDecorators": true,
                "emitDecoratorMetadata": true,
                "esModuleInterop": true,
                "noUnusedParameters": false,
            },
            "include": [
                "src/**/*"
            ],
            "exclude": [
                "node_modules",
                "build",
                "scripts",
                "acceptance-tests",
                "webpack",
                "jest",
                "src/setupTests.ts"
            ]
        };
    let compilerOptions = tsConfig["compilerOptions"];
    compilerOptions["jsx"] = "react-jsx";
    compilerOptions["noImplicitReturns"] = false;
    compilerOptions["noUnusedLocals"] = false;
    compilerOptions["noUnusedParameters"] = false;
    compilerOptions["esModuleInterop"] = true;
    (tsConfig as Json).Save(tsConfigPath);
    console.log(`create webpack.config.js`);
    let webpackConfigPath = Path.Combine(projectDirectory, "webpack.config.js");
    if (!File.Exists(webpackConfigPath)) {
        File.WriteAllText(webpackConfigPath, File.ReadAllText(Path.Combine(templateDirectory, "webpack.config.js"), utf8), utf8);
    }
    let srcDirectory = Path.Combine(projectDirectory, "src");
    if (!Directory.Exists(srcDirectory)) {
        Directory.CreateDirectory(srcDirectory);
    }
    console.log(`create src/type.d.ts`);
    let typeDTSPath = Path.Combine(srcDirectory, "type.d.ts");
    if (!File.Exists(typeDTSPath)) {
        File.WriteAllText(typeDTSPath, File.ReadAllText(Path.Combine(templateDirectory, "type.d.ts"), utf8), utf8);
    }
    console.log(`create src/index.tsx`);
    let indexTSXPath = Path.Combine(srcDirectory, "index.tsx");
    if (!File.Exists(indexTSXPath)) {
        File.WriteAllText(indexTSXPath, File.ReadAllText(Path.Combine(templateDirectory, "index.tsx"), utf8), utf8);
        Directory.CreateDirectory(Path.Combine(srcDirectory, "lib"));
        Directory.CreateDirectory(Path.Combine(srcDirectory, "lib", "demo"));
        File.WriteAllText(Path.Combine(srcDirectory, "lib", "demo", "index.tsx"), File.ReadAllText(Path.Combine(templateDirectory, "demo.tsx"), utf8), utf8);
    }
    let gitignorePath = Path.Combine(projectDirectory, ".gitignore");
    if (!File.Exists(gitignorePath)) {
        console.log(`create .gitignore`);
        File.WriteAllText(gitignorePath, File.ReadAllText(Path.Combine(templateDirectory, ".gitignore"), utf8), utf8);
    }
    console.log(`finished`);
    return 0;
};

main();