import { Path } from "./System/IO/Path";
import { Directory } from "./System/IO/Directory";
import { File } from "./System/IO/File";
import { args } from "./context";
import { reflection } from "./reflection";
import { Type } from "./System/Type";
import { FieldInfo } from "./System/Reflection/FieldInfo";
import { MethodInfo } from "./System/Reflection/MethodInfo";
import { MemberTypes } from "./System/Reflection/MemberTypes";
import { ConstructorInfo } from "./System/Reflection/ConstructorInfo";
import { MemberInfo } from "./System/Reflection/MemberInfo";
import { Console } from "./System/Console";
import { Assembly } from "./System/Reflection/Assembly";
import { UTF8Encoding } from "./System/Text/UTF8Encoding";
const typeAlias = {
    "Int32": "number",
    "Int64": "number",
    "IntPtr": "number",
    "Byte": "number",
    "String": "string",
    "Boolean": "boolean",
    "Void": "void",
    "Object": "any",
    "Char": "string",
    "Double": "number",
    "Single": "number",
    "UInt32": "number",
    "UInt64": "number",
    "UIntPtr": "number",
    "Decimal": "number",
    "Float": "number",
    "Action": "()=>void",
    "Array": "any[]"
};
let getTypeAlias = (typeName: string) => {
    if (typeName.includes("`") || typeName.includes("&") || typeName.includes("*")) {
        return {
            success: false,
            data: typeName,
            containsAlias: false
        };
    }
    if (typeName.endsWith("[]")) {
        typeName = typeName.substring(0, typeName.length - 2);
        if (typeAlias[typeName] != null && typeAlias[typeName] != undefined) {
            return {
                success: true,
                data: typeAlias[typeName] + "[]",
                containsAlias: true
            };
        }
        else {
            return {
                success: true,
                data: typeName + "[]",
                containsAlias: false
            };
        }
    }
    else if (typeAlias[typeName] != null && typeAlias[typeName] != undefined) {
        return {
            success: true,
            data: typeAlias[typeName],
            containsAlias: true
        };
    }
    else {
        return {
            success: true,
            data: typeName,
            containsAlias: false
        };
    }
};

let exportMembers = (type: Type) => {
    let members = type.GetMembers();
    let lines = [] as string[];
    let toImport = [] as Type[];
    let staticMemberCombines = {} as {
        [key: string]: {
            parameters: {
                Names: string[],
                Types: string[]
            }[],
            returnTypes: string[],
            isValid: boolean,
            isConstructor: boolean
        }
    };
    let memberCombines = {} as {
        [key: string]: {
            parameters: {
                Names: string[],
                Types: string[]
            }[],
            returnTypes: string[],
            isValid: boolean,
            isConstructor: boolean
        }
    };
    members.forEach(member => {
        let types = [] as Type[];
        if (member.MemberType == "Field") {
            types.push((member as FieldInfo).FieldType);
        }
        else if (member.MemberType == "Method") {
            types.push((member as MethodInfo).ReturnType);
            (member as MethodInfo).GetParameters().forEach(p => {
                types.push(p.ParameterType);
            });
        }
        else if (member.MemberType == MemberTypes.Constructor) {
            (member as ConstructorInfo).GetParameters().forEach(p => {
                types.push(p.ParameterType);
            });
        }
        let isValid = true as boolean;
        types.forEach(itemType => {
            let alias = getTypeAlias(itemType.Name);
            if (alias.success == false) {
                isValid = false;
            }
            else if (alias.containsAlias == false && type.Name != itemType.Name) {
                if (toImport.includes(itemType)) return;
                if (itemType.Name.includes("[")) return;
                toImport.push(itemType);
            }
        });
        if (isValid == false) {
            return;
        }

        if (member.MemberType == "Field") {
            lines.push(`export const ${member.Name}: ${getTypeAlias((member as FieldInfo).FieldType.Name).data} = 0 as any;`);
        }
        else if (member.MemberType == "Method") {
            let method = member as MethodInfo;
            if (member.Name.startsWith("get_")) {
                return;
            }
            else if (member.Name.startsWith("set_")) {
                return;
            }
            else {
                let method = member as MethodInfo;
                let memberCombine = {} as {
                    parameters: {
                        Names: string[],
                        Types: string[]
                    }[],
                    returnTypes: string[],
                    isValid: boolean,
                    isConstructor: boolean
                };
                if (method.IsStatic) {
                    if ((staticMemberCombines[member.Name] != null && staticMemberCombines[member.Name] != undefined) == false) {
                        staticMemberCombines[member.Name] = {
                            parameters: [],
                            returnTypes: [],
                            isValid: false,
                            isConstructor: false
                        };
                    }
                    memberCombine = staticMemberCombines[member.Name];
                }
                else {
                    if ((memberCombines[member.Name] != null && memberCombines[member.Name] != undefined) == false) {
                        memberCombines[member.Name] = {
                            parameters: [],
                            returnTypes: [],
                            isValid: false,
                            isConstructor: false
                        };
                    }
                    memberCombine = memberCombines[member.Name];
                }

                memberCombine.isValid = true;
                memberCombine.isConstructor = false;

                let parameters = method.GetParameters();
                for (let i = 0; i < parameters.length; i++) {
                    let parameter = parameters[i];
                    if (memberCombine.parameters.length <= i) {
                        memberCombine.parameters.push({
                            Names: [],
                            Types: []
                        });
                    }
                    let names = memberCombine.parameters[i].Names;
                    let types = memberCombine.parameters[i].Types;
                    if (names.includes(parameter.Name) == false) {
                        names.push(parameter.Name);
                    }
                    let alias = getTypeAlias(parameter.ParameterType.Name);
                    if (types.includes(alias.data) == false) {
                        types.push(alias.data);
                    }
                }
                let returnTypeAlias = getTypeAlias(method.ReturnType.Name);
                if (memberCombine.returnTypes.includes(returnTypeAlias.data) == false) {
                    memberCombine.returnTypes.push(returnTypeAlias.data);
                }
            }
        }
        else if (member.MemberType == MemberTypes.Constructor) {

        }
    });
    let memberKeys = Object.keys(memberCombines);
    memberKeys.forEach(key => {
        let memberCombine = memberCombines[key];
        if (memberCombine.isValid == false) {
            return;
        }
        let parameters = memberCombine.parameters.map(p => `${p.Names.join("_or_")}?: ${p.Types.join(" | ")}`).join(", ");
        let returnTypes = memberCombine.returnTypes.join(" | ");
        if (memberCombine.isConstructor) {
        }
        else {
            lines.push(`export const ${key}:(${parameters})=> ${returnTypes} = 0 as any`);
        }
    });
    let staticMemberKeys = Object.keys(staticMemberCombines);
    staticMemberKeys.forEach(key => {
        let memberCombine = staticMemberCombines[key];
        if (memberCombine.isValid == false) {
            return;
        }
        let parameters = memberCombine.parameters.map(p => `${p.Names.join("_or_")}?: ${p.Types.join(" | ")}`).join(", ");
        let returnTypes = memberCombine.returnTypes.join(" | ");
        lines.push(`export const ${key}:(${parameters}) => ${returnTypes} = 0 as any`);
    });
    let importLines = [] as string[];
    toImport.forEach(item => {
        if (item.FullName == null) return;
        let relativePath = Path.GetRelativePath(Path.GetDirectoryName(type.FullName.replace(".", "/")), item.FullName.replace(".", "/")).replace("\\", "/");
        if (relativePath.startsWith(".") == false) relativePath = "./" + relativePath;
        importLines.push(`import { ${item.Name} } from "${relativePath}";`);
    });
    return [...importLines, ...lines].join("\n");
};

let exportClass = (type: Type) => {
    let members = type.GetMembers();
    let lines = [] as string[];
    lines.push(`export class ${type.Name} {`);
    let toImport = [] as Type[];
    let staticMemberCombines = {} as {
        [key: string]: {
            parameters: {
                Names: string[],
                Types: string[]
            }[],
            returnTypes: string[],
            isValid: boolean,
            isConstructor: boolean
        }
    };
    let memberCombines = {} as {
        [key: string]: {
            parameters: {
                Names: string[],
                Types: string[]
            }[],
            returnTypes: string[],
            isValid: boolean,
            isConstructor: boolean
        }
    };
    members.forEach(member => {
        let types = [] as Type[];
        if (member.MemberType == "Field") {
            types.push((member as FieldInfo).FieldType);
        }
        else if (member.MemberType == "Method") {
            types.push((member as MethodInfo).ReturnType);
            (member as MethodInfo).GetParameters().forEach(p => {
                types.push(p.ParameterType);
            });
        }
        else if (member.MemberType == MemberTypes.Constructor) {
            (member as ConstructorInfo).GetParameters().forEach(p => {
                types.push(p.ParameterType);
            });
        }
        let isValid = true as boolean;
        types.forEach(itemType => {
            let alias = getTypeAlias(itemType.Name);
            if (alias.success == false) {
                isValid = false;
            }
            else if (alias.containsAlias == false && type.Name != itemType.Name) {
                if (toImport.includes(itemType)) return;
                if (itemType.Name.includes("[")) return;
                toImport.push(itemType);
            }
        });
        if (isValid == false) {
            return;
        }

        if (member.MemberType == "Field") {
            lines.push(`    public ${member.Name}: ${getTypeAlias((member as FieldInfo).FieldType.Name).data};`);
        }
        else if (member.MemberType == "Method") {
            let method = member as MethodInfo;
            if (member.Name.startsWith("get_")) {
                if (method.IsStatic) {
                    lines.push(`    public static get ${member.Name.substring(4)}(): ${getTypeAlias(method.ReturnType.Name).data} {`);
                    lines.push(`        return {} as any;`);
                    lines.push(`    }`);
                }
                else {
                    lines.push(`    public get ${member.Name.substring(4)}(): ${getTypeAlias(method.ReturnType.Name).data} {`);
                    lines.push(`        return {} as any;`);
                    lines.push(`    }`);
                }
                return;
            }
            else if (member.Name.startsWith("set_")) {
                let args = method.GetParameters().map(p => `${p.Name}: ${getTypeAlias(p.ParameterType.Name).data}`).join(", ");
                if (method.IsStatic) {
                    lines.push(`    public static set ${member.Name.substring(4)}(${args}) {`);
                    lines.push(`    }`);
                }
                else {
                    lines.push(`    public set ${member.Name.substring(4)}(${args}) {`);
                    lines.push(`    }`);
                }
                return;
            }
            else {
                let method = member as MethodInfo;
                let memberCombine = {} as {
                    parameters: {
                        Names: string[],
                        Types: string[]
                    }[],
                    returnTypes: string[],
                    isValid: boolean,
                    isConstructor: boolean
                };
                if (method.IsStatic) {
                    if ((staticMemberCombines[member.Name] != null && staticMemberCombines[member.Name] != undefined) == false) {
                        staticMemberCombines[member.Name] = {
                            parameters: [],
                            returnTypes: [],
                            isValid: false,
                            isConstructor: false
                        };
                    }
                    memberCombine = staticMemberCombines[member.Name];
                }
                else {
                    if ((memberCombines[member.Name] != null && memberCombines[member.Name] != undefined) == false) {
                        memberCombines[member.Name] = {
                            parameters: [],
                            returnTypes: [],
                            isValid: false,
                            isConstructor: false
                        };
                    }
                    memberCombine = memberCombines[member.Name];
                }

                memberCombine.isValid = true;
                memberCombine.isConstructor = false;

                let parameters = method.GetParameters();
                for (let i = 0; i < parameters.length; i++) {
                    let parameter = parameters[i];
                    if (memberCombine.parameters.length <= i) {
                        memberCombine.parameters.push({
                            Names: [],
                            Types: []
                        });
                    }
                    let names = memberCombine.parameters[i].Names;
                    let types = memberCombine.parameters[i].Types;
                    if (names.includes(parameter.Name) == false) {
                        names.push(parameter.Name);
                    }
                    let alias = getTypeAlias(parameter.ParameterType.Name);
                    if (types.includes(alias.data) == false) {
                        types.push(alias.data);
                    }
                }
                let returnTypeAlias = getTypeAlias(method.ReturnType.Name);
                if (memberCombine.returnTypes.includes(returnTypeAlias.data) == false) {
                    memberCombine.returnTypes.push(returnTypeAlias.data);
                }
            }
        }
        else if (member.MemberType == MemberTypes.Constructor) {
            if ((memberCombines[member.Name] != null && memberCombines[member.Name] != undefined) == false) {
                memberCombines[member.Name] = {
                    parameters: [],
                    returnTypes: [],
                    isValid: false,
                    isConstructor: false
                };
            }
            let memberCombine = memberCombines[member.Name];
            memberCombine.isValid = true;
            memberCombine.isConstructor = true;
            let constructor = member as ConstructorInfo;
            let parameters = constructor.GetParameters();
            for (let i = 0; i < parameters.length; i++) {
                let parameter = parameters[i];
                if (memberCombine.parameters.length <= i) {
                    memberCombine.parameters.push({
                        Names: [],
                        Types: []
                    });
                }
                let names = memberCombine.parameters[i].Names;
                let types = memberCombine.parameters[i].Types;
                if (names.includes(parameter.Name) == false) {
                    names.push(parameter.Name);
                }
                let alias = getTypeAlias(parameter.ParameterType.Name);
                if (types.includes(alias.data) == false) {
                    types.push(alias.data);
                }
            }
        }
    });
    let memberKeys = Object.keys(memberCombines);
    memberKeys.forEach(key => {
        let memberCombine = memberCombines[key];
        if (memberCombine.isValid == false) {
            return;
        }
        let parameters = memberCombine.parameters.map(p => `${p.Names.join("_or_")}?: ${p.Types.join(" | ")}`).join(", ");
        let returnTypes = memberCombine.returnTypes.join(" | ");
        if (memberCombine.isConstructor) {
            lines.push(`    public constructor(${parameters}) {`);
            lines.push(`    }`);
        }
        else {
            lines.push(`    public ${key}(${parameters}): ${returnTypes} {`);
            lines.push(`        return {} as any;`);
            lines.push(`    }`);
        }
    });
    let staticMemberKeys = Object.keys(staticMemberCombines);
    staticMemberKeys.forEach(key => {
        let memberCombine = staticMemberCombines[key];
        if (memberCombine.isValid == false) {
            return;
        }
        let parameters = memberCombine.parameters.map(p => `${p.Names.join("_or_")}?: ${p.Types.join(" | ")}`).join(", ");
        let returnTypes = memberCombine.returnTypes.join(" | ");
        lines.push(`    public static ${key}(${parameters}): ${returnTypes} {`);
        lines.push(`        return {} as any;`);
        lines.push(`    }`);
    });
    lines.push(`}`);
    let importLines = [] as string[];
    toImport.forEach(item => {
        if (item.FullName == null) return;
        let relativePath = Path.GetRelativePath(Path.GetDirectoryName(type.FullName.replace(".", "/")), item.FullName.replace(".", "/")).replace("\\", "/");
        if (relativePath.startsWith(".") == false) relativePath = "./" + relativePath;
        importLines.push(`import { ${item.Name} } from "${relativePath}";`);
    });
    return [...importLines, ...lines].join("\n");
};

let exportEnum = (type: Type) => {
    let lines = [] as string[];
    lines.push(`export enum ${type.Name} {`);
    type.GetEnumValues().forEach(v => {
        lines.push(`    ${v.Node.ToString()} = "${v.Node.ToString()}",`);
    });
    lines.push(`}`);
    return lines.join("\n");
}

let exportTypeScript = (type: Type) => {
    if (type.IsEnum) {
        return exportEnum(type);
    }
    else return exportClass(type);
};

let exportTypes = (rootDirectory: string, types: Type[]) => {
    let index = 0;
    types.forEach(type => {
        console.log(`Exporting ${type.FullName} (${index}/${types.length})`);
        index = index + 1;
        if (type.FullName.includes("+") || type.FullName.includes("`") || type.FullName.startsWith("__")) {
            return;
        }
        let directory = Path.GetFullPath(type.FullName.replace(".", "/"), rootDirectory);
        directory = Path.GetDirectoryName(directory);
        if (Directory.Exists(directory) == false) {
            Directory.CreateDirectory(directory);
        }
        File.WriteAllText(Path.GetFullPath(type.FullName.replace(".", "/") + ".ts", rootDirectory), exportTypeScript(type));
    });
};

let exportTypesByTypeNameRegex = (typeNameRegex: string) => {
    let types = reflection.getTypes(typeNameRegex);
    let index = 0;
    types.forEach(type => {
        console.log(`To Export ${type.FullName} (${index++}/${types.length})`);
    });
    // 询问是否继续
    console.log("Continue? (y/n)");
    let isContinue = Console.ReadLine();
    if (isContinue != "y") {
        console.log("Canceled.");
        return;
    }
    exportTypes(Directory.GetCurrentDirectory(), types);
};

let exportTypesByFileImports = (path: string) => {
    let lines = File.ReadAllLines(path, new UTF8Encoding(false));
    // 遍历所有行，找到import的行，解析出"或者'包裹的路径
    // 如果路径以.ts结尾，则先去除.ts
    // 然后以./两个字符进行分割，并过滤掉空字符串，然后以\.进行连接
    // 然后将结果保存到一个数组中
    let importPaths = [] as string[];
    lines.forEach((line: string) => {
        if (line.startsWith("import")) {
            let path = "";
            if (line.includes("\"")) {
                path = line.substring(line.indexOf("\"") + 1, line.lastIndexOf("\""));
            }
            else if (line.includes("'")) {
                path = line.substring(line.indexOf("'") + 1, line.lastIndexOf("'"));
            }
            if (path.endsWith(".ts")) {
                path = path.substring(0, path.length - 3);
            }
            importPaths.push(path.replace(".", "/").split("/").filter(p => p != "").join("/"));
        }
    });
    for (let i = 0; i < importPaths.length; i++) {
        let importPath = importPaths[i];
        if (importPath == "context" || importPath == "reflection") {
            importPath = `TypeSharp/System/${importPath}`;
        }
        importPaths[i] = `^${importPath.replace("/", "\\.")}$`;
    }
    let types = reflection.getTypes(importPaths.join("|"));
    // 询问是否继续
    console.log(`Export Directory: ${Directory.GetCurrentDirectory()}`);
    let index = 0;
    types.forEach(type => {
        console.log(`To Export ${type.FullName} (${index++}/${types.length})`);
    });
    console.log("Continue? (y/n)");
    let isContinue = Console.ReadLine();
    if (isContinue != "y") {
        console.log("Canceled.");
        return;
    }
    console.log("Exporting...");
    exportTypes(Path.GetDirectoryName(path), types);
};

let exportInitialTypes = (typeNameRegex: string, membersTypeNameRegex: string) => {
    let rootDirectory = Directory.GetCurrentDirectory();
    let types = reflection.getTypes(typeNameRegex);
    let memberTypes = reflection.getTypes(membersTypeNameRegex);
    let index = 0;
    let count = types.length + memberTypes.length;
    types.forEach(type => {
        console.log(`To Export ${type.FullName} (${index++}/${count})`);
    });
    memberTypes.forEach(type => {
        console.log(`To Export ${type.FullName} (${index++}/${count})`);
    });
    console.log("Continue? (y/n)");
    let isContinue = Console.ReadLine();
    if (isContinue != "y") {
        console.log("Canceled.");
        return;
    }
    index = 0;
    types.forEach(type => {
        console.log(`Exporting ${type.FullName} (${index++}/${count})`);
        if (type.FullName.includes("+") || type.FullName.includes("`") || type.FullName.startsWith("__")) {
            return;
        }
        let directory = Path.GetFullPath(type.FullName.replace(".", "/"), rootDirectory);
        directory = Path.GetDirectoryName(directory);
        if (Directory.Exists(directory) == false) {
            Directory.CreateDirectory(directory);
        }
        File.WriteAllText(Path.GetFullPath(type.FullName.replace(".", "/") + ".ts", rootDirectory), exportTypeScript(type));
    });
    memberTypes.forEach(type => {
        console.log(`Exporting ${type.FullName} (${index++}/${count})`);
        if (type.FullName.includes("+") || type.FullName.includes("`") || type.FullName.startsWith("__")) {
            return;
        }
        let directory = Path.GetFullPath(type.FullName.replace(".", "/"), rootDirectory);
        let filename = Path.GetFileName(directory);
        directory = Path.GetDirectoryName(directory);
        if (Directory.Exists(directory) == false) {
            Directory.CreateDirectory(directory);
        }
        File.WriteAllText(Path.GetFullPath(filename + ".ts", rootDirectory), exportMembers(type));
    });
};

let help = () => {
    console.log("-".padEnd(48, "-"));
    console.log("Usage: types [typename-regex-string]");
    console.log("Example: types ^System\\.IO\\.Path$");
    console.log("-".padEnd(48, "-"));
    console.log("Usage: file [file-path]");
    console.log("Example: file main.ts");
    console.log("-".padEnd(48, "-"));
};

let main = () => {
    console.log(`args:${args}`);
    if (args.length == 0) {
        exportInitialTypes([
            "(System\\.IO\\.(Path|Directory|File))",
            "(System\\.Text\\.UTF8Encoding)",
            "(TidyHPC\\.(LiteJson|LiteXml|Routers)\\..*)"
        ].join("|"),"TypeSharp\\.System\\.context)");
    }
    else if (args.length == 2) {
        let cmd = args[0];
        if (cmd == "types") {
            exportTypesByTypeNameRegex(args[1]);
        }
        else if (cmd == "file") {
            exportTypesByFileImports(args[1]);
        }
        else {
            console.log("Unknown command.");
            help();
        }
    }
    else {
        console.log("Unknown command.");
        help();
    }
};

main();