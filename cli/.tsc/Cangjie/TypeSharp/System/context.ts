import { Apis } from "./Apis";
import { Consoles } from "./Consoles";
import { Axios } from "./Axios";
import { LoggerFile } from "../../../TidyHPC/Loggers/LoggerFile";
import { Type } from "../../../System/Type";
export class Context {
    public getContext(): any {
        return {} as any;
    }
    public setContext(context?: any): void {
        return {} as any;
    }
    public locate(path?: string): string {
        return {} as any;
    }
    public eval(script?: string): any {
        return {} as any;
    }
    public evalAsync(script?: string): Promise<any> {
        return {} as any;
    }
    public setLoggerPath(path?: string): void {
        return {} as any;
    }
    public getLoggerPath(): string {
        return {} as any;
    }
    public Dispose(): void {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public constructor(reference?: Context) {
    }
    public script_path: string;
    public get context(): any {
        return {} as any;
    }
    public get apis(): Apis {
        return {} as any;
    }
    public get console(): Consoles {
        return {} as any;
    }
    public get axios(): Axios {
        return {} as any;
    }
    public get Logger(): LoggerFile {
        return {} as any;
    }
    public set Logger(value: LoggerFile) {
    }
    public get args(): string[] {
        return {} as any;
    }
    public set args(value: string[]) {
    }
    public get manifest(): any {
        return {} as any;
    }
    public set manifest(value: any) {
    }
}