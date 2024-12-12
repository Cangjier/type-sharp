import { Database } from "../../../TidyHPC/LiteDB/Database";
import { AuthorityService } from "../Authorities/AuthorityService";
import { JsonWebToken } from "./JsonWebToken";
import { UserInterface } from "./UserInterface";
import { Guid } from "../../../System/Guid";
import { Type } from "../../../System/Type";
export class UserService {
    public RegisterInterfaces(): Promise<void> {
        return {} as any;
    }
    public ContainsUser(userName?: string): Promise<boolean> {
        return {} as any;
    }
    public Register(userName?: string, secret?: string): Promise<UserInterface> {
        return {} as any;
    }
    public GetUser(userName_or_id?: string | Guid): Promise<UserInterface> {
        return {} as any;
    }
    public GetWhiteUser(userName_or_id?: string | Guid): Promise<UserInterface> {
        return {} as any;
    }
    public GetUsers(onUser?: ((arg0?:UserInterface)=>void)): Promise<void> {
        return {} as any;
    }
    public Login(userName?: string, secret?: string): Promise<string> {
        return {} as any;
    }
    public ModifyPassword(userName?: string, oldPassword?: string, newPassword?: string): Promise<void> {
        return {} as any;
    }
    public DeleteUser(userName_or_id?: string | Guid): Promise<void> {
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
    public constructor(database?: Database) {
    }
    public get Database(): Database {
        return {} as any;
    }
    public get AuthorityService(): AuthorityService {
        return {} as any;
    }
    public get JsonWebToken(): JsonWebToken {
        return {} as any;
    }
}