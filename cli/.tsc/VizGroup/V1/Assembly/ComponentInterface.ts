import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../System/Type";
export class ComponentInterface {
    public GetAttributesCount(database?: Database): Promise<number> {
        return {} as any;
    }
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
    public static New(): ComponentInterface {
        return {} as any;
    }
    public static op_Implicit(target?: ComponentInterface | any): any | ComponentInterface {
        return {} as any;
    }
    public static Allocate(database?: Database, referenceNodeKey?: string, name?: string, attributes?: any): Promise<ComponentInterface> {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get ReferenceNodeKey(): string {
        return {} as any;
    }
    public set ReferenceNodeKey(value: string) {
    }
    public get Attributes(): Guid {
        return {} as any;
    }
    public set Attributes(value: Guid) {
    }
    public get Name(): string {
        return {} as any;
    }
    public set Name(value: string) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}