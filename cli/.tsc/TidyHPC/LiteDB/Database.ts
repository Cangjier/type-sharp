import { Debugger } from "./Debuggers/Debugger";
import { ObjectInterface } from "./ObjectInterface";
import { Json } from "../LiteJson/Json";
import { Guid } from "../../System/Guid";
import { RecordIndex } from "./RecordIndex";
import { Type } from "../../System/Type";
export class Database {
    public Startup(databasePath?: string): Promise<void> {
        return {} as any;
    }
    public ContainsInterface(interfaceName?: string): Promise<boolean> {
        return {} as any;
    }
    public GetInterfaceNames(): Promise<string[]> {
        return {} as any;
    }
    public RegisterInterface(objectInterface?: ObjectInterface): Promise<void> {
        return {} as any;
    }
    public All(interfaceName?: string, onRecord?: ((arg0?:any)=>void)): Promise<void> {
        return {} as any;
    }
    public GetRecordAddressesByIndexArray(interfaceName?: string, indexName?: string, indexValue?: any): Promise<number[]> {
        return {} as any;
    }
    public GetRecordAddressesByIndexHashSet(interfaceName?: string, indexName?: string, indexValue?: any): Promise<number[]> {
        return {} as any;
    }
    public ContainsByIndex(interfaceName?: string, indexName?: string, indexValue?: any): Promise<boolean> {
        return {} as any;
    }
    public ContainsByMaster(interfaceName?: string, master?: Guid): Promise<boolean> {
        return {} as any;
    }
    public FindByMaster(interfaceName?: string, master?: Guid): Promise<any> {
        return {} as any;
    }
    public FindByIndex(interfaceName?: string, indexName?: string, indexValue?: any): Promise<any> {
        return {} as any;
    }
    public FindByAddress(interfaceName_or_address?: string | number, address?: number): Promise<any> {
        return {} as any;
    }
    public Insert(interfaceName?: string, record?: any): Promise<RecordIndex> {
        return {} as any;
    }
    public Update(interfaceName?: string, recordAddress?: number, record?: any): Promise<void> {
        return {} as any;
    }
    public UpdateByMaster(interfaceName?: string, record?: any): Promise<void> {
        return {} as any;
    }
    public Delete(interfaceName?: string, recordAddress?: number): Promise<void> {
        return {} as any;
    }
    public DeleteByMaster(interfaceName?: string, master?: Guid): Promise<void> {
        return {} as any;
    }
    public RestoreByLogger(line?: string): Promise<void> {
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
    public get Debuger(): Debugger {
        return {} as any;
    }
}