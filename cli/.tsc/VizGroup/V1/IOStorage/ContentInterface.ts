import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../System/Type";
export class ContentInterface {
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(target?: any) {
    }
    public static op_Implicit(target?: any | ContentInterface): ContentInterface | any {
        return {} as any;
    }
    public static New(): ContentInterface {
        return {} as any;
    }
    public static Allocate(database?: Database, contentMD5?: string, contentLength?: number, referenceCount?: number): Promise<ContentInterface> {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get ContentMD5(): string {
        return {} as any;
    }
    public set ContentMD5(value: string) {
    }
    public get ContentEncoding(): number {
        return {} as any;
    }
    public set ContentEncoding(value: number) {
    }
    public get ContentLength(): number {
        return {} as any;
    }
    public set ContentLength(value: number) {
    }
    public get ReferenceCount(): number {
        return {} as any;
    }
    public set ReferenceCount(value: number) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}