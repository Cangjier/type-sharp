import { TaskService } from "../TaskService";
import { TaskInterface } from "./TaskInterface";
import { IWebsocketResponse } from "../../../../TidyHPC/LiteHttpServer/IWebsocketResponse";
import { Guid } from "../../../../System/Guid";
import { Type } from "../../../../System/Type";
export class TaskCollection {
    public Run(task?: TaskInterface): Promise<void> {
        return {} as any;
    }
    public RunAndSubscribeProgress(task?: TaskInterface, websocketResponse?: IWebsocketResponse, isCloseAfterSubscribeCompleted?: boolean): Promise<void> {
        return {} as any;
    }
    public CompleteTask(task?: TaskInterface): void {
        return {} as any;
    }
    public UpdateProgress(id?: Guid, progress?: any): Promise<void> {
        return {} as any;
    }
    public SubscribeProgress(id?: Guid, response?: IWebsocketResponse): void {
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