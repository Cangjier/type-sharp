import { Guid } from "../../../../System/Guid";
import { PerformanceInterface } from "./PerformanceInterface";
import { TaskService } from "../TaskService";
import { AgentCollection } from "./AgentCollection";
import { IWebsocketResponse } from "../../../../TidyHPC/LiteHttpServer/IWebsocketResponse";
import { PluginInterface } from "../Plugins/PluginInterface";
import { TaskInterface } from "../Tasks/TaskInterface";
import { Type } from "../../../../System/Type";
export class Agent {
    public AddPlugin(plugin?: PluginInterface): void {
        return {} as any;
    }
    public RemovePlugin(pluginName?: string): void {
        return {} as any;
    }
    public Clear(): void {
        return {} as any;
    }
    public Run(task?: TaskInterface): Promise<void> {
        return {} as any;
    }
    public ContainsPlugin(pluginName?: string): boolean {
        return {} as any;
    }
    public InstallPackage(packageName?: string): Promise<void> {
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
    public constructor(taskService?: TaskService, agentCollection?: AgentCollection) {
    }
    public static op_Implicit(agent?: Agent): any {
        return {} as any;
    }
    public get ID(): Guid {
        return {} as any;
    }
    public set ID(value: Guid) {
    }
    public get HostName(): string {
        return {} as any;
    }
    public set HostName(value: string) {
    }
    public get Performance(): PerformanceInterface {
        return {} as any;
    }
    public set Performance(value: PerformanceInterface) {
    }
    public get TaskService(): TaskService {
        return {} as any;
    }
    public get AgentCollection(): AgentCollection {
        return {} as any;
    }
    public get WebsocketResponse(): IWebsocketResponse {
        return {} as any;
    }
    public set WebsocketResponse(value: IWebsocketResponse) {
    }
}