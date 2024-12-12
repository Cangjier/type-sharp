import { databaseInterface } from "./databaseInterface";
import { RecordIndex } from "../../../TidyHPC/LiteDB/RecordIndex";
import { Guid } from "../../../System/Guid";
import { Type } from "../../../System/Type";
import { Database } from "../../../TidyHPC/LiteDB/Database";
export class database {
    public register(objectInterface?: databaseInterface): Promise<void> {
        return {} as any;
    }
    public insert(interfaceName?: string, record?: any): Promise<RecordIndex> {
        return {} as any;
    }
    public findByMaster(interfaceName?: string, id?: Guid): Promise<any> {
        return {} as any;
    }
    public findByIndex(interfaceName?: string, fieldName?: string, value?: any): Promise<any> {
        return {} as any;
    }
    public findByIndexArray(interfaceName?: string, fieldName?: string, value?: any): Promise<any> {
        return {} as any;
    }
    public findByIndexSet(interfaceName?: string, fieldName?: string, value?: any): Promise<any> {
        return {} as any;
    }
    public containsByMaster(interfaceName?: string, id?: Guid): Promise<boolean> {
        return {} as any;
    }
    public containsByIndex(interfaceName?: string, fieldName?: string, value?: any): Promise<boolean> {
        return {} as any;
    }
    public updatebyMaster(interfaceName?: string, record?: any): Promise<void> {
        return {} as any;
    }
    public deleteByMaster(interfaceName?: string, id?: Guid): Promise<void> {
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
    public constructor(target?: Database) {
    }
    public static open(filePath?: string): Promise<database> {
        return {} as any;
    }
}