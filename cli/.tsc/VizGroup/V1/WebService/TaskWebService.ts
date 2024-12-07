import { ServiceScope } from "../ServiceScope";
import { Guid } from "../../../System/Guid";
import { Session } from "../../../TidyHPC/Routers/Urls/Session";
import { NetMessageInterface } from "../../../TidyHPC/LiteJson/NetMessageInterface";
import { Type } from "../../../System/Type";
export class TaskWebService {
    public PluginRunAsync(session?: Session, pluginName?: string): Promise<Guid> {
        return {} as any;
    }
    public Run(session?: Session): Promise<NetMessageInterface> {
        return {} as any;
    }
    public RunAsync(session?: Session): Promise<Guid> {
        return {} as any;
    }
    public Query(id?: Guid): Promise<NetMessageInterface> {
        return {} as any;
    }
    public UpdateProgress(task_id?: Guid, progress?: any): Promise<void> {
        return {} as any;
    }
    public SubscribeProgress(task_id?: Guid, session?: Session): Promise<void> {
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
    public constructor(serviceScope?: ServiceScope) {
    }
    public get ServiceScope(): ServiceScope {
        return {} as any;
    }
}