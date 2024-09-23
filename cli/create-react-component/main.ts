import { args, cmd, script_path } from "./context";
import { Path } from "./System/IO/Path"
import { Json } from './TidyHPC/LiteJson/Json';
import { File } from './System/IO/File';
import { UTF8Encoding } from './System/Text/UTF8Encoding';
import { Directory } from './System/IO/Directory';

let main = () => {
    console.log(`create-react-component`);
    console.log(`script_path:${script_path}`);
    let script_directory = Path.GetDirectoryName(script_path);
    let templateDirectory = Path.Combine(script_directory, "template");
    let utf8 = new UTF8Encoding(false);
    let projectDirectory = Path.GetFullPath(args[0]);
    if (Directory.Exists(projectDirectory) == false) {
        Directory.CreateDirectory(projectDirectory);
    }
    console.log(`Creating project in ${projectDirectory}`);
    console.log(`npm init -y`);
    if (cmd(projectDirectory, `npm init -y`) != 0) {
        return -1;
    }
    console.log(`npm install react react-dom typescript @types/react @types/react-dom webpack webpack-cli ts-loader @svgr/webpack url-loader file-loader --save-dev`);
    let packagePath = Path.Combine(projectDirectory, "package.json");
    let packageJson = Json.Load(packagePath);
    packageJson["author"] = "Demo";
    packageJson["scripts"] = {
        "build": "webpack --config webpack.config.js",
    };
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
        "file-loader"
    ];
    let installScript = `npm install ${packages.join(" ")} --save-dev`;
    if (cmd(projectDirectory, installScript) != 0) {
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
    File.WriteAllText(webpackConfigPath, File.ReadAllText(Path.Combine(templateDirectory, "webpack.config.js"), utf8), utf8);
    let srcDirectory = Path.Combine(projectDirectory, "src");
    if (!Directory.Exists(srcDirectory)) {
        Directory.CreateDirectory(srcDirectory);
    }
    console.log(`create src/type.d.ts`);
    let typeDTSPath = Path.Combine(srcDirectory, "type.d.ts");
    File.WriteAllText(typeDTSPath, File.ReadAllText(Path.Combine(templateDirectory, "type.d.ts"), utf8), utf8);
    console.log(`create src/index.tsx`);
    let indexTSXPath = Path.Combine(srcDirectory, "index.tsx");
    File.WriteAllText(indexTSXPath, File.ReadAllText(Path.Combine(templateDirectory, "index.tsx"), utf8), utf8);
    console.log(`finished`);
    return 0;
};

main();