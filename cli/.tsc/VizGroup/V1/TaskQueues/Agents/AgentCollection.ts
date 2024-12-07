import { TaskService } from "../TaskService";
import { Guid } from "../../../../System/Guid";
import { IWebsocketResponse } from "../../../../TidyHPC/LiteHttpServer/IWebsocketResponse";
import { TaskInterface } from "../Tasks/TaskInterface";
import { PerformanceInterface } from "./PerformanceInterface";
import { Type } from "../../../../System/Type";
export class AgentCollection {
    public Register(agentId?: Guid, websocketResponse?: IWebsocketResponse, plugins?: any): void {
        return {} as any;
    }
    public ContainsAgent(agentId_or_task?: Guid | TaskInterface): boolean {
        return {} as any;
    }
    public UpdatePerformance(agentId?: Guid, hostName?: string, performance?: PerformanceInterface): void {
        return {} as any;
    }
    public UpdatePlugins(agentId?: Guid, plugins?: any): void {
        return {} as any;
    }
    public GetAgents(): Agent[] {
        return {} as any;
    }
    public InstallPackage(agentId?: Guid, packageName?: string): Promise<void> {
        return {} as any;
    }
    public Exit(agentID?: Guid): void {
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
    public constructor(taskService?: TaskService) {
    }
    public get TaskService(): TaskService {
        return {} as any;
    }
}