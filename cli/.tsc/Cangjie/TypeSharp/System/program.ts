import { Type } from "../../../System/Type";
import { Context } from "./Context";
export class program {
    public Dispose(): void {
        return {} as any;
    }
    public runAsync(args?: string[], context?: any): Promise<void> {
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
    public constructor(filePath?: string, code?: string, context?: Context) {
    }
    public static load(filePath?: string, code?: string): program {
        return {} as any;
    }
    public static loadFile(filePath?: string, context?: any): program {
        return {} as any;
    }
}