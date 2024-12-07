import { ServiceScope } from "../ServiceScope";
import { Session } from "../../../TidyHPC/Routers/Urls/Session";
import { Type } from "../../../System/Type";
export class PackageWebService {
    public Contains(name?: string): Promise<boolean> {
        return {} as any;
    }
    public Upgrade(session?: Session, name?: string, description?: string, dataUri?: string, versionFlag?: number): Promise<any> {
        return {} as any;
    }
    public List(name?: string): Promise<any> {
        return {} as any;
    }
    public All(): Promise<any> {
        return {} as any;
    }
    public Get(name?: string): Promise<any> {
        return {} as any;
    }
    public Query(names?: any): Promise<any> {
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