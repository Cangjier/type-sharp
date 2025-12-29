import { Guid } from "../../../System/Guid";
import { Byte } from "../../../System/Byte";
import { Int32 } from "../../../System/Int32";
import { Task } from "../../../System/Threading/Tasks/Task";
import { TerminalOptions } from "../TerminalOptions";
import { CancellationToken } from "../../../System/Threading/CancellationToken";
import { Type } from "../../../System/Type";
export class WindowsTerminal {
    public add_OutputReceived(value?: ((arg0?:number[], arg1?:number)=>Promise<void>)): void {
        return {} as any;
    }
    public remove_OutputReceived(value?: ((arg0?:number[], arg1?:number)=>Promise<void>)): void {
        return {} as any;
    }
    public Dispose(): void {
        return {} as any;
    }
    public ResizeAsync(columns?: number, rows?: number, cancellationToken?: CancellationToken): Promise<void> {
        return {} as any;
    }
    public StartAsync(cancellationToken?: CancellationToken): Promise<boolean> {
        return {} as any;
    }
    public WriteInputAsync(buffer?: number[], length?: number, cancellationToken?: CancellationToken): Promise<void> {
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
    public constructor(options?: TerminalOptions) {
    }
    public get ID(): Guid {
        return {} as any;
    }
    public set ID(value: Guid) {
    }
    public get IsRunning(): boolean {
        return {} as any;
    }
    public get Options(): TerminalOptions {
        return {} as any;
    }
    public get OutputBufferSize(): number {
        return {} as any;
    }
}