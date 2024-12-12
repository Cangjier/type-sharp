import { Database } from "../Database";
import { Type } from "../../../System/Type";
export class Debugger {
    public GetSize(): Promise<number> {
        return {} as any;
    }
    public GetIsInitialized(): Promise<boolean> {
        return {} as any;
    }
    public GetObjectInterfaces(): Promise<any> {
        return {} as any;
    }
    public GetTypeNames(): Promise<string[]> {
        return {} as any;
    }
    public ScanTypeTable(): Promise<any> {
        return {} as any;
    }
    public PrintTypeTable(): Promise<void> {
        return {} as any;
    }
    public PrintBlockUsedStatus(typeName?: string): Promise<void> {
        return {} as any;
    }
    public PrintMetaAllocaterStatus(): Promise<void> {
        return {} as any;
    }
    public PrintDatabaseStatus(): Promise<void> {
        return {} as any;
    }
    public AllocateHashTable(): Promise<number> {
        return {} as any;
    }
    public AllocateHashRecord(): Promise<number> {
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
    public constructor(database?: Database) {
    }
    public get Database(): Database {
        return {} as any;
    }
}