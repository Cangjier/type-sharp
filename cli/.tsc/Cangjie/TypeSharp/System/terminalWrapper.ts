import { ITerminal } from "../../../TidyHPC/Terminal/ITerminal";
import { Guid } from "../../../System/Guid";
import { String } from "../../../System/String";
import { Task } from "../../../System/Threading/Tasks/Task";
import { Type } from "../../../System/Type";
export class terminalWrapper {
    public resizeAsync(columns?: number, rows?: number): Promise<void> {
        return {} as any;
    }
    public writeAsync(data?: any): Promise<void> {
        return {} as any;
    }
    public startWithBase64BytesOutputAsync(callback?: ((arg0?:string)=>Promise<void>)): Promise<void> {
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
    public constructor(target?: ITerminal) {
    }
    public get Target(): ITerminal {
        return {} as any;
    }
    public get ID(): Guid {
        return {} as any;
    }
}