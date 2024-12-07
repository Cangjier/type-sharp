import { ObjectInterface } from "../../../../TidyHPC/LiteDB/ObjectInterface";
import { Guid } from "../../../../System/Guid";
import { Database } from "../../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../../System/Type";
export class KeyValueInterface {
    public DeserializeFromJson(self?: any): void {
        return {} as any;
    }
    public SerializeToJson(self?: any): void {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public Insert(db?: Database): Promise<void> {
        return {} as any;
    }
    public Update(db?: Database): Promise<void> {
        return {} as any;
    }
    public Delete(db?: Database): Promise<void> {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(target?: any) {
    }
    public static FindByKey(db?: Database, key?: string): Promise<any> {
        return {} as any;
    }
    public Target: any;
    public static get InterfaceName(): string {
        return {} as any;
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Key(): string {
        return {} as any;
    }
    public set Key(value: string) {
    }
    public get Value(): string {
        return {} as any;
    }
    public set Value(value: string) {
    }
}