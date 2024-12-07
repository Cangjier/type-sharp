import { ServiceScope } from "../ServiceScope";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { DocumentInterface } from "./DocumentInterface";
import { Type } from "../../../System/Type";
export class PDMService {
    public CheckIn(document?: DocumentInterface): Promise<any> {
        return {} as any;
    }
    public GetNode(key?: string): Promise<any> {
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
    public constructor(scope?: ServiceScope) {
    }
    public get Scope(): ServiceScope {
        return {} as any;
    }
    public get Database(): Database {
        return {} as any;
    }
}