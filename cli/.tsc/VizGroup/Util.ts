import { UTF8Encoding } from "../System/Text/UTF8Encoding";
import { TimeSpan } from "../System/TimeSpan";
import { Type } from "../System/Type";
export class Util {
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
    public constructor() {
    }
    public static GetLocalDirectory(parent?: number): string {
        return {} as any;
    }
    public static GetDataDirectory(): string {
        return {} as any;
    }
    public static GetSpecialDirectory(directoryName?: string): string {
        return {} as any;
    }
    public static CreateDirectory(directory?: string): string {
        return {} as any;
    }
    public static ConvertToHexString(hash?: number[]): string {
        return {} as any;
    }
    public static GetFileMD5(filePath?: string): string {
        return {} as any;
    }
    public static WhenAll(format_or_func?: string | (()=>Promise<void>), funcs?: (()=>Promise<void>)): Promise<void> {
        return {} as any;
    }
    public static CapitalizeFirstLetter(str?: string): string {
        return {} as any;
    }
    public static GetErrorMessageFromLogger(lines?: string[]): string {
        return {} as any;
    }
    public static GetNetworkIPAddressV4s(): IPAddress[] {
        return {} as any;
    }
    public static GetNetworkIPAddressV6s(): IPAddress[] {
        return {} as any;
    }
    public static GetMD5(input?: string): string {
        return {} as any;
    }
    public static GetChildRootDirectory(path?: string): string {
        return {} as any;
    }
    public static CmdAsync(workingDirectory?: string, commandLine?: string, timeout?: TimeSpan): Promise<number> {
        return {} as any;
    }
    public static GetShell(): string {
        return {} as any;
    }
    public static GetShellArguments(command?: string): string {
        return {} as any;
    }
    public static get UTF8(): UTF8Encoding {
        return {} as any;
    }
}