import { Type } from "../../../System/Type";
import { Database } from "../Database";
export class MetaAllocater {
    public AllocateRecord(): Promise<number> {
        return {} as any;
    }
    public AllocateHashTable(): Promise<number> {
        return {} as any;
    }
    public GetBlockAddresses(): Promise<number[]> {
        return {} as any;
    }
    public ContainsBlockAddress(address?: number): Promise<boolean> {
        return {} as any;
    }
    public RemoveRecord(recordAddress?: number): Promise<void> {
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
    public constructor(db?: Database, typeName?: string, metaRecordAddress?: number) {
    }
    public get TypeName(): string {
        return {} as any;
    }
    public get MetaRecordAddress(): number {
        return {} as any;
    }
}