import { exec, args, cmd } from "./context";
import { Path } from "./System/IO/Path"
import { Json } from './TidyHPC/LiteJson/Json';
import { Console } from './System/Console';
import { File } from './System/IO/File';
import { UTF8Encoding } from './System/Text/UTF8Encoding';
import { Directory } from './System/IO/Directory';

let main = () => {
    let projectDirectory = Path.GetFullPath(args[0]);

    if (cmd(projectDirectory, `npm init -y`) != 0) {
        return -1;
    }
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
    compilerOptions["noImplicitReturns"]=false;
    compilerOptions["noUnusedLocals"]=false;
    compilerOptions["noUnusedParameters"]=false;
    compilerOptions["esModuleInterop"]=true;
    (tsConfig as Json).Save(tsConfigPath);
    let webpackConfigPath = Path.Combine(projectDirectory, "webpack.config.js");
    File.WriteAllText(webpackConfigPath,`
const path = require('path');
const { svgxUse } = require('@svgr/webpack');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            titleProp: true, // 是否添加title属性到React组件中
                            refProp: 'innerRef', // 指定转换的SVG组件的ref属性名
                        },
                    },
                    'url-loader', // 或者使用'file-loader'，具体取决于你希望如何处理SVG文件
                ],
            },
        ],
    },
    externals: {
        react: {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },
    mode: 'development'
};`,new UTF8Encoding(false));
    let srcDirectory = Path.Combine(projectDirectory, "src");
    if (!Directory.Exists(srcDirectory)) {
        Directory.CreateDirectory(srcDirectory);
    }
    let typeDTSPath = Path.Combine(srcDirectory, "type.d.ts");
    File.WriteAllText(typeDTSPath,`
declare module '*.svg' {  
    import React = require('react');  

    const src: string;  
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;  

    export default src;  
    export { ReactComponent };
}`,new UTF8Encoding(false));
    let indexTSXPath = Path.Combine(srcDirectory, "index.tsx");
    File.WriteAllText(indexTSXPath,`
        //enjoy
        //npm run build -> 编译项目
        //npm login -> 登录npm
        //npm publish -> 发布项目`,new UTF8Encoding(false));
};