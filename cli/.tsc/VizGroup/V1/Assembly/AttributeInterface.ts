import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../System/Type";
export class AttributeInterface {
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
    public static op_Implicit(target?: any | AttributeInterface): AttributeInterface | any {
        return {} as any;
    }
    public static Allocate(database?: Database, key?: string, value?: string): Promise<AttributeInterface> {
        return {} as any;
    }
    public Target?: any;
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
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}