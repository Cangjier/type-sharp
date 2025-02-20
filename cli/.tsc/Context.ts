import { Apis } from "./Cangjie/TypeSharp/System/Apis";
import { Consoles } from "./Cangjie/TypeSharp/System/Consoles";
import { Axios } from "./Cangjie/TypeSharp/System/Axios";
import { LoggerFile } from "./TidyHPC/Loggers/LoggerFile";
import { Type } from "./System/Type";
export const script_path: string = 0 as any;
export const getContext:()=> any = 0 as any
export const setContext:(context?: any)=> void = 0 as any
export const locate:(path?: string)=> string = 0 as any
export const eval:(script?: string)=> any = 0 as any
export const setLoggerPath:(path?: string)=> void = 0 as any
export const getLoggerPath:()=> string = 0 as any
export const Dispose:()=> void = 0 as any
export const GetType:()=> Type = 0 as any
export const ToString:()=> string = 0 as any
export const Equals:(obj?: any)=> boolean = 0 as any
export const GetHashCode:()=> number = 0 as any
export const context: any = 0 as any;
export const apis: Apis = 0 as any;
export const console: Consoles = 0 as any;
export const axios: Axios = 0 as any;
export const Logger: LoggerFile = 0 as any;
export const args: string[] = 0 as any;
export const manifest: any = 0 as any;