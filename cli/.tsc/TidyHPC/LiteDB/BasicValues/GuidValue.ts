import { Database } from "../Database";
import { Guid } from "../../../System/Guid";
import { Type } from "../../../System/Type";
export class GuidValue {
    public Write(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public Read(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public SetEmpty(): void {
        return {} as any;
    }
    public IsEmpty(): boolean {
        return {} as any;
    }
    public GetHashCode(database?: Database): number | Promise<number> {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public static GetSize(): number {
        return {} as any;
    }
    public static op_Implicit(value?: Guid | GuidValue): GuidValue | Guid {
        return {} as any;
    }
    public Value: Guid;
}