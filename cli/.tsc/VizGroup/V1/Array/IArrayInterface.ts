import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { FieldType } from "../../../TidyHPC/LiteDB/Metas/FieldType";
import { Type } from "../../../System/Type";
export class IArrayInterface {
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
    public static GetInterface(interfaceName?: string, arrayType?: FieldType): ObjectInterface {
        return {} as any;
    }
    public static op_Implicit(arrayInterface?: IArrayInterface): any {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Next(): Guid {
        return {} as any;
    }
    public set Next(value: Guid) {
    }
    public get Length(): number {
        return {} as any;
    }
    public set Length(value: number) {
    }
    public get IsFull(): boolean {
        return {} as any;
    }
    public set IsFull(value: boolean) {
    }
    public get Elements(): any {
        return {} as any;
    }
}