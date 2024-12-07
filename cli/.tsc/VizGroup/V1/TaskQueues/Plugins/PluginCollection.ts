import { TaskService } from "../TaskService";
import { Type } from "../../../../System/Type";
export class PluginCollection {
    public ReloadPlugins(): void {
        return {} as any;
    }
    public GetPluginPath(pluginName?: string): string {
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
    public constructor(taskService?: TaskService) {
    }
    public get TaskService(): TaskService {
        return {} as any;
    }
    public get OnLoadedPlugins(): ()=>void {
        return {} as any;
    }
    public set OnLoadedPlugins(value: ()=>void) {
    }
    public get Enable(): boolean {
        return {} as any;
    }
    public set Enable(value: boolean) {
    }
    public get PluginDirectory(): string {
        return {} as any;
    }
    public set PluginDirectory(value: string) {
    }
}