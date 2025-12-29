import { Guid } from "../../System/Guid";
import { TerminalOptions } from "./TerminalOptions";
import { Byte } from "../../System/Byte";
import { Int32 } from "../../System/Int32";
import { Task } from "../../System/Threading/Tasks/Task";
import { CancellationToken } from "../../System/Threading/CancellationToken";
export class ITerminal {
    public add_OutputReceived(value?: ((arg0?:number[], arg1?:number)=>Promise<void>)): void {
        return {} as any;
    }
    public remove_OutputReceived(value?: ((arg0?:number[], arg1?:number)=>Promise<void>)): void {
        return {} as any;
    }
    public StartAsync(cancellationToken?: CancellationToken): Promise<boolean> {
        return {} as any;
    }
    public WriteInputAsync(buffer?: number[], length?: number, cancellationToken?: CancellationToken): Promise<void> {
        return {} as any;
    }
    public ResizeAsync(columns?: number, rows?: number, cancellationToken?: CancellationToken): Promise<void> {
        return {} as any;
    }
    public static CreateTerminal(options?: TerminalOptions): ITerminal {
        return {} as any;
    }
    public static GetDefaultShell(): string {
        return {} as any;
    }
    public get ID(): Guid {
        return {} as any;
    }
    public set ID(value: Guid) {
    }
    public get OutputBufferSize(): number {
        return {} as any;
    }
}