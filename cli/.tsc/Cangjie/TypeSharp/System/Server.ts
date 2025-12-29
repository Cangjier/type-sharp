import { Application } from "../Server/Application";
import { ApplicationConfig } from "../Server/ApplicationConfig";
import { TaskCompletionSource } from "../../../System/Threading/Tasks/TaskCompletionSource";
import { Delegate } from "../../../System/Delegate";
import { Type } from "../../../System/Type";
export class Server {
    public start(port?: number): Promise<void> {
        return {} as any;
    }
    public use(pattern?: string, delegate?: Delegate): void {
        return {} as any;
    }
    public useStatic(directory?: string): void {
        return {} as any;
    }
    public usePlugins(directory?: string, enable?: boolean): void {
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
    public constructor(application?: Application) {
    }
    public get Application(): Application {
        return {} as any;
    }
    public get ApplicationConfig(): ApplicationConfig {
        return {} as any;
    }
    public get onConfigCompleted(): TaskCompletionSource {
        return {} as any;
    }
}