import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Type } from "../../../System/Type";
export class AuthorityInterface {
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
    public static op_Implicit(target?: AuthorityInterface | any): any | AuthorityInterface {
        return {} as any;
    }
    public static GetAuthorities(database?: Database): Promise<AuthorityInterface[]> {
        return {} as any;
    }
    public static GetUsedAuthorities(database?: Database): Promise<AuthorityInterface[]> {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Index(): number {
        return {} as any;
    }
    public set Index(value: number) {
    }
    public get Used(): boolean {
        return {} as any;
    }
    public set Used(value: boolean) {
    }
    public get Guest(): number {
        return {} as any;
    }
    public set Guest(value: number) {
    }
    public get Alias(): string {
        return {} as any;
    }
    public set Alias(value: string) {
    }
    public get Description(): string {
        return {} as any;
    }
    public set Description(value: string) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}