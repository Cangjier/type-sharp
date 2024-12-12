import { Database } from "../Database";
import { Type } from "../../../System/Type";
import { Field } from "./Field";
export class FieldRuntime {
    public SerializeToBuffer(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public DeserializeFromBuffer(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public DeserializeFromJson(db?: Database, element?: any, isBorrowString?: boolean): Promise<void> {
        return {} as any;
    }
    public SerializeToJson(self?: any): void {
        return {} as any;
    }
    public ReleaseReference(db?: Database): Promise<void> {
        return {} as any;
    }
    public IncreaseReference(db?: Database): Promise<void> {
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
    public constructor(define?: Field, value?: any) {
    }
    public Define: Field;
    public Value: any;
    public static get Debug(): boolean {
        return {} as any;
    }
    public static set Debug(value: boolean) {
    }
}