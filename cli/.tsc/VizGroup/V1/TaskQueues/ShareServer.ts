import { TaskService } from "./TaskService";
import { Guid } from "../../../System/Guid";
import { UrlRouter } from "../../../TidyHPC/Routers/Urls/UrlRouter";
import { TaskInterface } from "./Tasks/TaskInterface";
import { Type } from "../../../System/Type";
export class ShareServer {
    public Start(urlRouter?: UrlRouter): Promise<void> {
        return {} as any;
    }
    public Register(pluginsArray?: any): Promise<void> {
        return {} as any;
    }
    public Update(pluginsArray?: any): Promise<void> {
        return {} as any;
    }
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
    public constructor(taskService?: TaskService) {
    }
    public get TaskService(): TaskService {
        return {} as any;
    }
    public get UrlPrefix(): string {
        return {} as any;
    }
    public set UrlPrefix(value: string) {
    }
    public get Enabled(): boolean {
        return {} as any;
    }
    public set Enabled(value: boolean) {
    }
    public get AgentId(): Guid {
        return {} as any;
    }
    public set AgentId(value: Guid) {
    }
}