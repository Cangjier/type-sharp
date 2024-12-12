import { Guid } from "../../../System/Guid";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { NodeInstanceInterface } from "./NodeInstanceInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Task } from "../../../System/Threading/Tasks/Task";
import { Version } from "../../../System/Version";
import { String } from "../../../System/String";
import { Type } from "../../../System/Type";
export class NodeInterface {
    public CreateInstance(database?: Database, onCreate_or_version_or_attributes?: ((arg0?:NodeInstanceInterface)=>Promise<void>) | Version | { [key: string]: string }, attributes?: { [key: string]: string }, dataUris?: string[]): Promise<NodeInstanceInterface> {
        return {} as any;
    }
    public GetLatestInstance(database?: Database): Promise<NodeInstanceInterface> {
        return {} as any;
    }
    public GetOrCreateLatestInstance(database?: Database, onCreate?: ((arg0?:NodeInstanceInterface)=>Promise<void>)): Promise<NodeInstanceInterface> {
        return {} as any;
    }
    public GetInstancesCount(database?: Database): Promise<number> {
        return {} as any;
    }
    public ForeachInstances(database?: Database, onItem?: ((arg0?:NodeInstanceInterface)=>void)): Promise<void> {
        return {} as any;
    }
    public GetInstances(database?: Database): Promise<NodeInstanceInterface[]> {
        return {} as any;
    }
    public GetInstance(database?: Database, version?: Version): Promise<NodeInstanceInterface> {
        return {} as any;
    }
    public ContainsInstance(database?: Database, version?: Version): Promise<boolean> {
        return {} as any;
    }
    public Update(database?: Database): Promise<void> {
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
    public constructor(target?: any) {
    }
    public static New(): NodeInterface {
        return {} as any;
    }
    public static op_Implicit(target?: any | NodeInterface): NodeInterface | any {
        return {} as any;
    }
    public static GetNodesByType(database?: Database, type?: string): Promise<NodeInterface[]> {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Key(): string {
        return {} as any;
    }
    public set Key(value: string) {
    }
    public get Status(): number {
        return {} as any;
    }
    public set Status(value: number) {
    }
    public get Type(): string {
        return {} as any;
    }
    public set Type(value: string) {
    }
    public get Instances(): Guid {
        return {} as any;
    }
    public set Instances(value: Guid) {
    }
    public get LatestInstance(): Guid {
        return {} as any;
    }
    public set LatestInstance(value: Guid) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}