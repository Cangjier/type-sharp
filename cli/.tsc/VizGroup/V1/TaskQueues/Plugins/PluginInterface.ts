import { TaskService } from "../TaskService";
import { TaskInterface } from "../Tasks/TaskInterface";
import { Type } from "../../../../System/Type";
export class PluginInterface {
    public Run(taskService?: TaskService, task?: TaskInterface): Promise<void> {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(target?: any) {
    }
    public static op_Implicit(target_or_plugin?: any | PluginInterface): PluginInterface | any {
        return {} as any;
    }
    public Target?: any;
    public get Name(): string {
        return {} as any;
    }
    public get IsEnable(): boolean {
        return {} as any;
    }
    public get DisplayName(): string {
        return {} as any;
    }
    public get Description(): string {
        return {} as any;
    }
    public get Version(): string {
        return {} as any;
    }
    public get Author(): string {
        return {} as any;
    }
    public get Type(): string {
        return {} as any;
    }
    public get Entry(): string {
        return {} as any;
    }
    public get Timeout(): number {
        return {} as any;
    }
    public get Callback(): string {
        return {} as any;
    }
}