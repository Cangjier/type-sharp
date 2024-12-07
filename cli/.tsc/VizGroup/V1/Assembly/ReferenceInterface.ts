import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../System/Type";
export class ReferenceInterface {
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
    public static op_Implicit(target?: any | ReferenceInterface): ReferenceInterface | any {
        return {} as any;
    }
    public static New(): ReferenceInterface {
        return {} as any;
    }
    public static Allocate(database?: Database, referenceNodeKey?: string): Promise<ReferenceInterface> {
        return {} as any;
    }
    public get Target(): any {
        return {} as any;
    }
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
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}