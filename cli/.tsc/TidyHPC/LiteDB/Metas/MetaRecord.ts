import { Database } from "../Database";
import { Type } from "../../../System/Type";
export class MetaRecord {
    public Read(buffer?: number[], offset?: number, database?: Database): void {
        return {} as any;
    }
    public Write(buffer?: number[], offset?: number, database?: Database): void {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public TypeName: string;
    public RecordSize: number;
    public DefineRecordAddress: number;
    public BlockAddresses: number[];
    public NextMetaRecordAddress: number;
    public FirstMetaRecordAddress: number;
    public static Size: number;
}