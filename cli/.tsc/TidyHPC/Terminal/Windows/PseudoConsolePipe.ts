import { Type } from "../../../System/Type";
import { SafeFileHandle } from "../../../Microsoft/Win32/SafeHandles/SafeFileHandle";
export class PseudoConsolePipe {
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
    public constructor() {
    }
    public ReadSide: SafeFileHandle;
    public WriteSide: SafeFileHandle;
}