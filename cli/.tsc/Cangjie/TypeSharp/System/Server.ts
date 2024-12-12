import { Application } from "../../../VizGroup/V1/Application";
import { ApplicationConfig } from "../../../VizGroup/V1/ApplicationConfig";
import { database } from "./database";
import { ServiceScope } from "../../../VizGroup/V1/ServiceScope";
import { ioStorageService } from "./ioStorageService";
import { TaskCompletionSource } from "../../../System/Threading/Tasks/TaskCompletionSource";
import { Delegate } from "../../../System/Delegate";
import { Type } from "../../../System/Type";
export class Server {
    public getDatabase(): database {
        return {} as any;
    }
    public start(port?: number): Promise<void> {
        return {} as any;
    }
    public use(pattern?: string, delegate?: Delegate): void {
        return {} as any;
    }
    public useStatic(directory?: string): void {
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
    public get Application(): Application {
        return {} as any;
    }
    public get ApplicationConfig(): ApplicationConfig {
        return {} as any;
    }
    public get serviceScope(): ServiceScope {
        return {} as any;
    }
    public get storageService(): ioStorageService {
        return {} as any;
    }
    public get onDatabaseSetupCompleted(): TaskCompletionSource {
        return {} as any;
    }
    public get onConfigCompleted(): TaskCompletionSource {
        return {} as any;
    }
}