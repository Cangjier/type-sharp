import { Type } from "../../System/Type";
export class context {
    public args: string[];
    public manifest: any;
    public script_path: string;
    public null: any;
    public undefined: any;
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
    public static exec(path?: string, args?: string[]): number {
        return {} as any;
    }
    public static start(path?: string, args?: string[]): void {
        return {} as any;
    }
    public static cmd(workingDirectory?: string, commandLine?: string): number {
        return {} as any;
    }
    public static cmdAsync(workingDirectory?: string, commandLine?: string): Promise<number> {
        return {} as any;
    }
    public static startCmd(workingDirectory?: string, commandLine?: string): void {
        return {} as any;
    }
    public static parseFloat(value?: string): number {
        return {} as any;
    }
    public static parseInt(value?: string): number {
        return {} as any;
    }
    public static toString(value?: any): string {
        return {} as any;
    }
    public static Number(value?: string): any {
        return {} as any;
    }
    public static copyDirectory(sourceDirectory?: string, destinationDirectory?: string): void {
        return {} as any;
    }
}