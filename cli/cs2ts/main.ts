import { Path } from "../.tsc/System/IO/Path";
import { Directory } from "../.tsc/System/IO/Directory";
import { File } from "../.tsc/System/IO/File";
import { args } from "../.tsc/context";
import { reflection } from "../.tsc/Cangjie/TypeSharp/System/reflection";
import { FullName } from "../.tsc/Cangjie/TypeSharp/FullNameScript/FullName";
import { Type } from "../.tsc/System/Type";
import { FieldInfo } from "../.tsc/System/Reflection/FieldInfo";
import { MethodInfo } from "../.tsc/System/Reflection/MethodInfo";
import { MemberTypes } from "../.tsc/System/Reflection/MemberTypes";
import { ConstructorInfo } from "../.tsc/System/Reflection/ConstructorInfo";
import { MemberInfo } from "../.tsc/System/Reflection/MemberInfo";
import { Console } from "../.tsc/System/Console";
import { Assembly } from "../.tsc/System/Reflection/Assembly";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { ParameterInfo } from "../.tsc/System/Reflection/ParameterInfo";
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
    "Array": "any[]",
    "Json": "any",
    "Task": "Promise<void>"
};
let getTypeAlias = (typeName: string) => {
    return {
        success: true,
        data: typeName,
        containsAlias: false,
        toImport: []
    } as {
        success: boolean,
        data: string,
        containsAlias: boolean,
        toImport?: Type[]
    };
};

let isValidTypeName = (typeFullName: string) => {
    return (typeFullName.includes("+") || typeFullName.includes("`") || typeFullName.startsWith("__")) == false;
};
let isTaskType = (fullName: FullName) => {
    return fullName.TypeName == "Task";
};
let getTaskTypeAias = (fullName: FullName) => {
    if (fullName.IsGeneric == false) {
        return {
            data: "Promise<void>",
            toImport: []
        };
    }
    let genericTypes = fullName.GenericTypes;
    if (genericTypes.length == 0) {
        return {
            data: "Promise<void>",
            toImport: []
        };
    }
    let genericType = genericTypes[0];
    let alias = getTypeAlias(genericType.ToString());
    if (alias.success == false) {
        return {
            data: "Promise<any>",
            toImport: []
        };
    }
    let result = {
        data: `Promise<${alias.data}>`,
        toImport: (alias.containsAlias ? [] : [reflection.getType(`${genericType.NameSpace}.${genericType.TypeName}`)])
    };
    return result;
};
let isFuncType = (fullName: FullName) => {
    return fullName.TypeName == "Func";
};
let getFuncTypeAlias = (fullName: FullName) => {
    let toImport = [] as Type[];
    let genericTypeFullNames = fullName.GenericTypes;
    let returnTypeAlias = getTypeAlias(genericTypeFullNames[genericTypeFullNames.length - 1].ToString());
    if (returnTypeAlias.success == false) {
        return {
            success: true,
            data: "(()=>any)",
            toImport: toImport
        }
    }
    let parameters = genericTypeFullNames.slice(0, genericTypeFullNames.length - 1).map(p => getTypeAlias(p.ToString()));
    let parameterIndex = 0;
    let parameterTypes = parameters.map(p => p.success ? `arg${parameterIndex++}?:${p.data}` : `arg${parameterIndex++}?:any`).join(", ");
    for (let genericTypeFullName of genericTypeFullNames) {
        let genericType = reflection.getType(genericTypeFullName.ToString());
        if (genericType) {
            toImport.push(genericType);
        }
    }
    return {
        data: `((${parameterTypes})=>${returnTypeAlias.data})`,
        toImport: toImport
    }
}
let isListType = (fullName: FullName) => {
    return fullName.TypeName == "List";
};
let getListTypeAlias = (fullName: FullName) => {
    let toImport = [] as Type[];
    let genericTypeFullName = fullName.GenericTypes[0];
    let alias = getTypeAlias(genericTypeFullName.ToString());
    let genericType = reflection.getType(genericTypeFullName.ToString());
    if (genericType) {
        toImport.push(genericType);
    }
    if (alias.success == false) {
        return {
            data: "any[]",
            toImport: toImport
        };
    }
    return {
        data: `${alias.data}[]`,
        toImport: toImport
    };
};
let isDicttionary = (fullName: FullName) => {
    return fullName.TypeName == "Dictionary" && fullName.GenericTypes.length == 2;
};
let getDictionaryTypeAlias = (fullName: FullName) => {
    let toImport = [] as Type[];
    let genericTypeFullNames = fullName.GenericTypes;
    let keyTypeAlias = getTypeAlias(genericTypeFullNames[0].ToString());
    let valueTypeAlias = getTypeAlias(genericTypeFullNames[1].ToString());
    for (let genericTypeFullName of genericTypeFullNames) {
        let genericType = reflection.getType(genericTypeFullName.ToString());
        if (genericType) {
            toImport.push(genericType);
        }
    }
    if (keyTypeAlias.success == false || valueTypeAlias.success == false) {
        return {
            data: "{ [key: string]: any }",
            toImport: toImport
        };
    }
    return {
        data: `{ [key: ${keyTypeAlias.data}]: ${valueTypeAlias.data} }`,
        toImport: toImport
    };
}
let isEnumarableAndImplicitFromJson = (fullName: FullName) => {
    try {
        let type = reflection.getType(fullName.ToString());
        if (reflection.isImplicitFromJson(type) == false) {
            return false;
        }
        return reflection.getEnumarables(type).length > 0;
    }
    catch {
        return false;
    }
};
let getEnumarableTypeAlias = (fullName: FullName) => {
    let toImport = [] as Type[];
    let type = reflection.getType(fullName.ToString());
    let enumarables = reflection.getEnumarables(type);
    enumarables.forEach(item => {
        toImport.push(item);
    });
    if (enumarables.length == 0) {
        return {
            data: "any",
            toImport: toImport
        };
    }
    let enumarable = enumarables[0];
    return {
        data: `${getTypeAlias(enumarable.ToString()).data}[]`,
        toImport: toImport
    };
};
getTypeAlias = (typeFullName: string) => {
    if (typeFullName.includes("&") || typeFullName.includes("*")) {
        return {
            success: false,
            data: typeFullName,
            containsAlias: false
        };
    }
    let fullName;
    try {
        fullName = reflection.parseFullName(typeFullName);
    }
    catch (e) {
        console.log(typeFullName, e);
        throw `typeFullName=${typeFullName}`;
    }
    if (isTaskType(fullName)) {
        let taskTypeAlias = getTaskTypeAias(fullName);
        return {
            success: true,
            data: taskTypeAlias.data,
            containsAlias: true,
            toImport: taskTypeAlias.toImport
        };
    }
    else if (isFuncType(fullName)) {
        let subTypeAlias = getFuncTypeAlias(fullName);
        return {
            success: true,
            data: subTypeAlias.data,
            containsAlias: true,
            toImport: subTypeAlias.toImport
        };
    }
    else if (isListType(fullName)) {
        let subTypeAlias = getListTypeAlias(fullName);
        return {
            success: true,
            data: subTypeAlias.data,
            containsAlias: true,
            toImport: subTypeAlias.toImport
        };
    }
    else if (isDicttionary(fullName)) {
        let subTypeAlias = getDictionaryTypeAlias(fullName);
        return {
            success: true,
            data: subTypeAlias.data,
            containsAlias: true,
            toImport: subTypeAlias.toImport
        };
    }
    else if (isEnumarableAndImplicitFromJson(fullName)) {
        let subTypeAlias = getEnumarableTypeAlias(fullName);
        return {
            success: true,
            data: subTypeAlias.data,
            containsAlias: true,
            toImport: subTypeAlias.toImport
        };
    }
    else if (typeFullName.includes("`") || typeFullName.includes("&") || typeFullName.includes("*")) {
        return {
            success: false,
            data: typeFullName,
            containsAlias: false
        };
    }
    else if (fullName.IsArray) {
        if (typeAlias[fullName.TypeName] != null && typeAlias[fullName.TypeName] != undefined) {
            return {
                success: true,
                data: typeAlias[fullName.TypeName] + "[]",
                containsAlias: true
            };
        }
        else {
            return {
                success: true,
                data: fullName.TypeName + "[]",
                containsAlias: false
            };
        }
    }
    else if (typeAlias[fullName.TypeName] != null && typeAlias[fullName.TypeName] != undefined) {
        return {
            success: true,
            data: typeAlias[fullName.TypeName],
            containsAlias: true
        };
    }
    else {
        return {
            success: true,
            data: fullName.TypeName,
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
                Types: string[],
                isParams: boolean
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
                Types: string[],
                isParams: boolean
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
            lines.push(`export const ${member.Name}: ${getTypeAlias((member as FieldInfo).FieldType.FullName).data} = 0 as any;`);
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
                        Types: string[],
                        isParams: boolean
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
                            Types: [],
                            isParams: false
                        });
                    }
                    let memberParameter = memberCombine.parameters[i];
                    memberParameter.isParams = reflection.isParams(parameter);
                    let names = memberParameter.Names;
                    let types = memberParameter.Types;
                    if (names.includes(parameter.Name) == false) {
                        names.push(parameter.Name);
                    }
                    let alias = getTypeAlias(parameter.ParameterType.FullName);
                    if (types.includes(alias.data) == false) {
                        types.push(alias.data);
                    }
                }
                let returnTypeAlias = getTypeAlias(method.ReturnType.FullName);
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
        let parameters = memberCombine.parameters.map(p => {
            if (p.isParams) {
                return `...${p.Names.join("_or_")}: ${p.Types.join(" | ")}`;
            }
            else {
                return `${p.Names.join("_or_")}?: ${p.Types.join(" | ")}`;
            }
        }).join(", ");
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
        let parameters = memberCombine.parameters.map(p => {
            if (p.isParams) {
                return `...${p.Names.join("_or_")}: ${p.Types.join(" | ")}`;
            }
            else {
                return `${p.Names.join("_or_")}?: ${p.Types.join(" | ")}`;
            }
        }).join(", ");
        let returnTypes = memberCombine.returnTypes.join(" | ");
        lines.push(`export const ${key}:(${parameters}) => ${returnTypes} = 0 as any`);
    });
    let importLines = [] as string[];
    toImport.forEach(item => {
        if (item.FullName == null) return;
        let relativePath = item.FullName.replace(".", "/");
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
    let fields = {} as {
        [key: string]: {
            type: string,
            isStatic: boolean
        }
    };
    let properties = {} as {
        [key: string]: {
            type: string,
            isStatic: boolean,
            isGet: boolean,
            isSet: boolean
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
            let alias = getTypeAlias(itemType.FullName);
            if (alias.toImport) {
                for (let toImportItemType of alias.toImport) {
                    if (toImportItemType == null) continue;
                    if (toImport.includes(toImportItemType)) continue;
                    if (toImportItemType.Name.includes("[")) continue;
                    toImport.push(toImportItemType);
                }
            }
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
            fields[member.Name] = {
                type: getTypeAlias((member as FieldInfo).FieldType.FullName).data,
                isStatic: (member as FieldInfo).IsStatic
            };
            // lines.push(`    public ${member.Name}: ${getTypeAlias((member as FieldInfo).FieldType.FullName).data};`);
        }
        else if (member.MemberType == "Method") {
            let method = member as MethodInfo;
            if (member.Name.startsWith("get_")) {
                let propertyName = member.Name.substring(4);
                if (method.IsStatic) {

                    if (properties[propertyName]) {
                        properties[propertyName].isGet = true;
                    }
                    else {
                        properties[propertyName] = {
                            type: getTypeAlias(method.ReturnType.FullName).data,
                            isStatic: true,
                            isGet: true,
                            isSet: false
                        };
                    }
                    // lines.push(`    public static get ${member.Name.substring(4)}(): ${getTypeAlias(method.ReturnType.FullName).data} {`);
                    // lines.push(`        return {} as any;`);
                    // lines.push(`    }`);
                }
                else {

                    if (properties[propertyName]) {
                        properties[propertyName].isGet = true;
                    }
                    else {
                        properties[propertyName] = {
                            type: getTypeAlias(method.ReturnType.FullName).data,
                            isStatic: false,
                            isGet: true,
                            isSet: false
                        };
                    }
                    // lines.push(`    public get ${member.Name.substring(4)}(): ${getTypeAlias(method.ReturnType.FullName).data} {`);
                    // lines.push(`        return {} as any;`);
                    // lines.push(`    }`);
                }
                return;
            }
            else if (member.Name.startsWith("set_")) {
                let propertyName = member.Name.substring(4);
                // let args = method.GetParameters().map(p => `${p.Name}: ${getTypeAlias(p.ParameterType.FullName).data}`).join(", ");
                if (method.IsStatic) {
                    if (properties[propertyName]) {
                        properties[propertyName].isSet = true;
                    }
                    else {
                        properties[propertyName] = {
                            type: getTypeAlias(method.ReturnType.FullName).data,
                            isStatic: true,
                            isGet: false,
                            isSet: true
                        };
                    }
                    // lines.push(`    public static set ${member.Name.substring(4)}(${args}) {`);
                    // lines.push(`    }`);
                }
                else {
                    if (properties[propertyName]) {
                        properties[propertyName].isSet = true;
                    }
                    else {
                        properties[propertyName] = {
                            type: getTypeAlias(method.ReturnType.FullName).data,
                            isStatic: false,
                            isGet: false,
                            isSet: true
                        };
                    }
                    // lines.push(`    public set ${member.Name.substring(4)}(${args}) {`);
                    // lines.push(`    }`);
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
                    let alias = getTypeAlias(parameter.ParameterType.FullName);
                    if (types.includes(alias.data) == false) {
                        types.push(alias.data);
                    }
                }
                let returnTypeAlias = getTypeAlias(method.ReturnType.FullName);
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
                let alias = getTypeAlias(parameter.ParameterType.FullName);
                if (types.includes(alias.data) == false) {
                    types.push(alias.data);
                }
            }
        }
    });
    let isContainsOpImplicit = staticMemberCombines.op_Implicit != undefined;
    let firstLetter = type.Name[0].toLowerCase();
    let firstLetterIsLowerCase = firstLetter == type.Name[0];
    if (isContainsOpImplicit && firstLetterIsLowerCase) {
        // 如果包含op_Implicit方法，并且类名的首字母是小写，则该类是一个接口描述类
    }
    else {
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
    }

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

    let fieldKeys = Object.keys(fields);
    if (isContainsOpImplicit && (firstLetterIsLowerCase || type.Name.toLowerCase().endsWith("interface"))) {
        // 如果包含op_Implicit方法，并且类名的首字母是小写，则该类是一个接口描述类
        fieldKeys.forEach(key => {
            let field = fields[key];
            if (field.isStatic) {
                // lines.push(`    public static ${key}: ${field.type};`);
            }
            else {
                lines.push(`    public ${key}?: ${field.type};`);
            }
        });
    }
    else {
        fieldKeys.forEach(key => {
            let field = fields[key];
            if (field.isStatic) {
                lines.push(`    public static ${key}: ${field.type};`);
            }
            else {
                lines.push(`    public ${key}: ${field.type};`);
            }
        });
    }

    let propertyKeys = Object.keys(properties);
    if (isContainsOpImplicit && firstLetterIsLowerCase) {
        propertyKeys.forEach(key => {
            let property = properties[key];
            if (property.isStatic) {
                lines.push(`    public static ${key}?: ${property.type};`);
            }
            else {
                lines.push(`    public ${key}?: ${property.type};`);
            }
        });
    }
    else {
        propertyKeys.forEach(key => {
            let property = properties[key];
            if (property.isStatic) {
                if (property.isGet) {
                    lines.push(`    public static get ${key}(): ${property.type} {`);
                    lines.push(`        return {} as any;`);
                    lines.push(`    }`);
                }
                if (property.isSet) {
                    lines.push(`    public static set ${key}(value: ${property.type}) {`);
                    lines.push(`    }`);
                }
            }
            else {
                if (property.isGet) {
                    lines.push(`    public get ${key}(): ${property.type} {`);
                    lines.push(`        return {} as any;`);
                    lines.push(`    }`);
                }
                if (property.isSet) {
                    lines.push(`    public set ${key}(value: ${property.type}) {`);
                    lines.push(`    }`);
                }
            }
        });
    }


    lines.push(`}`);
    let importLines = [] as string[];
    toImport.forEach(item => {
        if (item.FullName == null) return;
        if (item == type) return;
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
        if (isValidTypeName(type.FullName) == false) {
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
    let types = reflection.getTypes(typeNameRegex).filter(type => isValidTypeName(type.FullName));
    let memberTypes = reflection.getTypes(membersTypeNameRegex).filter(type => isValidTypeName(type.FullName));
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
        let directory = Path.GetFullPath(type.FullName.replace(".", "/"), rootDirectory);
        directory = Path.GetDirectoryName(directory);
        if (Directory.Exists(directory) == false) {
            Directory.CreateDirectory(directory);
        }
        File.WriteAllText(Path.GetFullPath(type.FullName.replace(".", "/") + ".ts", rootDirectory), exportTypeScript(type));
    });
    memberTypes.forEach(type => {
        console.log(`Exporting ${type.FullName} (${index++}/${count})`);
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
            "(System\\.(Guid|DateTime|TimeSpan)$)",
            "(System\\.IO\\.(Path|Directory|File|SearchOption|EnumerationOptions)$)",
            "(System\\.Threading\\.Tasks\\.Task$)",
            "(System\\.Text\\.(UTF8Encoding|Encoding)$)",
            "(System\\.Text\\.RegularExpressions\\.(Regex|RegexOptions|Match|MatchCollection|GroupCollection|Group)$)",
            "(System\\.(Console|Type|Environment|OperatingSystem|PlatformID|Version|Convert|EnvironmentVariableTarget)$)",
            "(TidyHPC\\.(LiteJson|LiteXml|Routers)\\..*)",
            "(System\\.Reflection\\.(Assembly|ConstructorInfo|FieldInfo|MemberInfo|MemberTypes|MethodInfo|ParameterInfo)$)",
            "(Cangjie\\.TypeSharp\\.(System|FullNameScript)\\..*)",
            "(VizGroup\\..*)"
        ].join("|"), "Cangjie\\.TypeSharp\\.System\\.context");
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