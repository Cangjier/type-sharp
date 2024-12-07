import { ServiceScope } from "../ServiceScope";
import { Type } from "../../../System/Type";
export class UserWebService {
    public Register(username?: string, secret?: string): Promise<boolean> {
        return {} as any;
    }
    public Login(username?: string, secret?: string): Promise<string> {
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
    public constructor(serviceScope?: ServiceScope) {
    }
    public get ServiceScope(): ServiceScope {
        return {} as any;
    }
}