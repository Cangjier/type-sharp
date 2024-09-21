```
using TidyCommandLine.CommandAttributes;
using TidyConsole;
using TidyHPC.Extensions;
using TidyHPC.LiteJson;

namespace React.Cli;

[CommandRoot("react.cli")]
internal class Commands
{
    [CommandSub("list-svg", "将svg转换成component")]
    public class ListSvg
    {
        [CommandOption("-i", "--input", "输入目录",false)]
        public string InputDirectory { get; set; } = string.Empty;

        [CommandEntry]
        public async Task Entry()
        {
            if(InputDirectory==string.Empty)
            {
                InputDirectory = Directory.GetCurrentDirectory();
            }
            Console.WriteLine($"WorkingDirectory={InputDirectory}");
            Console.WriteLine("");
            Console.WriteLine("");
            File.WriteAllText(Path.Combine(InputDirectory, "index.ts"), await ListSvgToTypescript(InputDirectory), Util.UTF8);
            Console.WriteLine("Finished");
        }

        public static async Task<string> ListSvgToTypescript(string inputDirectory)
        {
            var lines = new List<string>();
            var files = Directory.GetFiles(inputDirectory, "*.svg", SearchOption.AllDirectories);
            foreach(var file in files)
            {
                await Util.FormatSvg(file);
            }
            lines.Add(files.Select(x => $"import {{ ReactComponent as {Path.GetFileNameWithoutExtension(x).FirstetterToUpper()}Svg }} from \"./{Path.GetRelativePath(inputDirectory, x).Replace('\\', '/')}\";").Join("\n"));
            List<string> group = [];
            foreach (var file in files)
            {
                group.Add(file);
                if (group.Count == 8)
                {
                    lines.Add("export {" + group.Select(x => $"{Path.GetFileNameWithoutExtension(x).FirstetterToUpper()}Svg").Join(",") + "}");
                    group.Clear();
                }
            }
            if (group.Count > 0)
            {
                lines.Add("export {" + group.Select(x => $"{Path.GetFileNameWithoutExtension(x).FirstetterToUpper()}Svg").Join(",") + "}");
            }
            return lines.Join("\n");
        }
    }

    [CommandSub("create", "创建项目")]
    public class Build
    {
        [CommandOption("-n", "--name", "项目名称", true)]
        public string Name { get; set; } = string.Empty;

        [CommandOption("-a", "--author", "作者", false)]
        public string Author { get; set; } = "";

        [CommandEntry]
        public async Task Entry()
        {
            var currentDirectory = Directory.GetCurrentDirectory();
            var projectDirectory = Path.Combine(currentDirectory, Name);
            if (Directory.Exists(projectDirectory))
            {
                Console.WriteLine("项目已存在");
                return;
            }
            Directory.CreateDirectory(projectDirectory);
            var randColor = (ConsoleColor)new Random().Next(0, 15);
            var iniResilt = await Consoles.ExecuteCommand(projectDirectory, "npm init -y", new(async line =>
            {
                Consoler.WriteLine(line.Content, randColor);
                await Task.CompletedTask;
            }, null));
            if (iniResilt.ExitCode != 0)
            {
                Console.WriteLine("初始化项目失败");
                return;
            }
            var packageJsonPath = Path.Combine(projectDirectory, "package.json");
            var packageJson = Json.Load(packageJsonPath);
            packageJson["author"] = Author;
            packageJson["scripts"] = new JsonObject()
            {
                ["build"] = "webpack --config webpack.config.js",
            };
            packageJson.Save(packageJsonPath);
            string[] packages = ["react", "react-dom", "typescript", "@types/react", "@types/react-dom",
                "webpack","webpack-cli","ts-loader","@svgr/webpack","url-loader","file-loader"];
            var installScript = $"npm install --save-dev {packages.Join(" ")}";
            randColor = (ConsoleColor)new Random().Next(0, 15);
            var installResult = await Consoles.ExecuteCommand(projectDirectory, installScript, new(async line =>
            {
                Consoler.WriteLine(line.Content, randColor);
                await Task.CompletedTask;
            }, null));
            if (installResult.ExitCode != 0)
            {
                Console.WriteLine("安装依赖失败");
                return;
            }
            var tsConfigPath = Path.Combine(projectDirectory, "tsconfig.json");
            var tsConfig = File.Exists(tsConfigPath) ? Json.Load(tsConfigPath) : Json.Parse("""
                {
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
                }
                """);
            tsConfig.SetByPath(["compilerOptions", "jsx"], "react-jsx");
            tsConfig.SetByPath(["compilerOptions", "noImplicitReturns"], false);
            tsConfig.SetByPath(["compilerOptions", "noUnusedLocals"], false);
            tsConfig.SetByPath(["compilerOptions", "noUnusedParameters"], false);
            tsConfig.SetByPath(["compilerOptions", "esModuleInterop"], true);
            tsConfig.Save(tsConfigPath);
            var webpackConfigPath = Path.Combine(projectDirectory, "webpack.config.js");
            File.WriteAllText(webpackConfigPath, """
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
                                test: /\.tsx?$/,
                                use: 'ts-loader',
                                exclude: /node_modules/,
                            },
                            {
                                test: /\.svg$/,
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
                };
                """, Util.UTF8);
            var srcDirectory = Path.Combine(projectDirectory, "src");
            Directory.CreateDirectory(srcDirectory);
            var typeDTsPath = Path.Combine(srcDirectory, "type.d.ts");
            File.WriteAllText(typeDTsPath, """
                declare module '*.svg' {  
                  import React = require('react');  

                  const src: string;  
                  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;  

                  export default src;  
                  export { ReactComponent };  
                }
                """, Util.UTF8);
            var indexTsxPath = Path.Combine(srcDirectory, "index.tsx");
            File.WriteAllText(indexTsxPath, """
                //enjoy
                //npm run build -> 编译项目
                //npm login -> 登录npm
                //npm publish -> 发布项目
                """, Util.UTF8);
            Console.WriteLine("项目创建成功");
        }
    }
}
```