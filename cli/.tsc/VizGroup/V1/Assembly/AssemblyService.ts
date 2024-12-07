import { NodeInterface } from "./NodeInterface";
import { NodeInstanceInterface } from "./NodeInstanceInterface";
import { Type } from "../../../System/Type";
import { Database } from "../../../TidyHPC/LiteDB/Database";
export class AssemblyService {
    public RegisterInterfaces(): Promise<void> {
        return {} as any;
    }
    public ContainsNode(key?: string): Promise<boolean> {
        return {} as any;
    }
    public GetNode(key?: string): Promise<NodeInterface> {
        return {} as any;
    }
    public CreateNode(key?: string, type?: string): Promise<NodeInterface> {
        return {} as any;
    }
    public GetOrCreateNode(key?: string, type?: string): Promise<NodeInterface> {
        return {} as any;
    }
    public GetLatestInstance(node?: NodeInterface): Promise<NodeInstanceInterface> {
        return {} as any;
    }
    public GetInstancesCount(key?: string): Promise<number> {
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
    public constructor(database?: Database) {
    }
}