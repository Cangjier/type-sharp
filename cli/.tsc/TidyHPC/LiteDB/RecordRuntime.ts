import { Database } from "./Database";
import { Type } from "../../System/Type";
import { Guid } from "../../System/Guid";
export class RecordRuntime {
    public SerializeToJson(db?: Database): Promise<any> {
        return {} as any;
    }
    public DeserializeFromNewJson(db?: Database, record?: any, isBorrowString?: boolean): Promise<void> {
        return {} as any;
    }
    public DeserializeFromOldJson(db?: Database, document?: any, isBorrowString?: boolean): Promise<void> {
        return {} as any;
    }
    public DeserializeFromBuffer(buffer?: number[], offset?: number): void {
        return {} as any;
    }
    public SerializeToBuffer(buffer?: number[], offset?: number): void {
        return {} as any;
    }
    public ReleaseReference(db?: Database): Promise<void> {
        return {} as any;
    }
    public Dispose(): void {
        return {} as any;
    }
    public ToString(indented?: boolean): string {
        return {} as any;
    }
    public GetType(): Type {
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
    public Master: Guid;
    public Fields: FieldRuntime[];
    public get Success(): boolean {
        return {} as any;
    }
    public set Success(value: boolean) {
    }
}