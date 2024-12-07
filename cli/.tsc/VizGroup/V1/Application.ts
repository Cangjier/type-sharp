import { Database } from "../../TidyHPC/LiteDB/Database";
import { ServiceScope } from "./ServiceScope";
import { Delegate } from "../../System/Delegate";
import { ApplicationConfig } from "./ApplicationConfig";
import { Type } from "../../System/Type";
export class Application {
    public Register(pattern?: string, delegate?: Delegate): void {
        return {} as any;
    }
    public Start(config?: ApplicationConfig): Promise<void> {
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
    public constructor() {
    }
    public get Database(): Database {
        return {} as any;
    }
    public get ServiceScope(): ServiceScope {
        return {} as any;
    }
}