import { AgentCollection } from "./Agents/AgentCollection";
import { TaskCollection } from "./Tasks/TaskCollection";
import { PluginCollection } from "./Plugins/PluginCollection";
import { ShareServer } from "./ShareServer";
import { TaskInterface } from "./Tasks/TaskInterface";
import { Type } from "../../../System/Type";
export class TaskService {
    public Run(task?: TaskInterface): Promise<void> {
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
    public get AgentCollection(): AgentCollection {
        return {} as any;
    }
    public get TaskCollection(): TaskCollection {
        return {} as any;
    }
    public get PluginCollection(): PluginCollection {
        return {} as any;
    }
    public get ShareServer(): ShareServer {
        return {} as any;
    }
    public get CurrentServerUrlPrefix(): string {
        return {} as any;
    }
    public set CurrentServerUrlPrefix(value: string) {
    }
}