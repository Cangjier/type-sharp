import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../System/Type";
export class DataNodeInterface {
    public Update(database?: Database): Promise<void> {
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
    public constructor(target?: any) {
    }
    public static op_Implicit(target?: DataNodeInterface | any): any | DataNodeInterface {
        return {} as any;
    }
    public static New(): DataNodeInterface {
        return {} as any;
    }
    public static Allocate(database?: Database, type_or_onInitial?: number | ((arg0?:DataNodeInterface)=>void) | ((arg0?:DataNodeInterface)=>Promise<void>), uri?: string): Promise<DataNodeInterface> {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Type(): number {
        return {} as any;
    }
    public set Type(value: number) {
    }
    public get Uri(): string {
        return {} as any;
    }
    public set Uri(value: string) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}