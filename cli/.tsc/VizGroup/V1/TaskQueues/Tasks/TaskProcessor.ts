import { TaskService } from "../TaskService";
import { TaskInterface } from "./TaskInterface";
import { Type } from "../../../../System/Type";
export class TaskProcessor {
    public Process(task?: TaskInterface): Promise<void> {
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