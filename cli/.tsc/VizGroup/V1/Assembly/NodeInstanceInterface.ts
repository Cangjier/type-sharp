import { Guid } from "../../../System/Guid";
import { Version } from "../../../System/Version";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { ComponentInterface } from "./ComponentInterface";
import { DataNodeInterface } from "./DataNodeInterface";
import { AttributeInterface } from "./AttributeInterface";
import { ReferenceInterface } from "./ReferenceInterface";
import { Type } from "../../../System/Type";
export class NodeInstanceInterface {
    public GetComponentsCount(database?: Database): Promise<number> {
        return {} as any;
    }
    public GetDataSetCount(database?: Database): Promise<number> {
        return {} as any;
    }
    public GetAttributesCount(database?: Database): Promise<number> {
        return {} as any;
    }
    public GetReferencesCount(database?: Database): Promise<number> {
        return {} as any;
    }
    public ForeachComponents(database?: Database, onItem?: ((arg0?:ComponentInterface)=>void)): Promise<void> {
        return {} as any;
    }
    public ForeachDataSet(database?: Database, onItem?: ((arg0?:DataNodeInterface)=>void)): Promise<void> {
        return {} as any;
    }
    public ForeachAttributes(database?: Database, onItem?: ((arg0?:AttributeInterface)=>void)): Promise<void> {
        return {} as any;
    }
    public ForeachReferences(database?: Database, onItem?: ((arg0?:ReferenceInterface)=>void)): Promise<void> {
        return {} as any;
    }
    public GetFirstDataNode(database?: Database): Promise<DataNodeInterface> {
        return {} as any;
    }
    public AddOrUpdateFirstDataNode(database?: Database, type?: number, uri?: string): Promise<DataNodeInterface> {
        return {} as any;
    }
    public AddDataNode(database?: Database, type?: number, uri?: string): Promise<DataNodeInterface> {
        return {} as any;
    }
    public AddComponents(database?: Database, components?: Guid[]): Promise<void> {
        return {} as any;
    }
    public RemoveComponents(database?: Database, components?: Guid[]): Promise<void> {
        return {} as any;
    }
    public ClearComponents(database?: Database): Promise<void> {
        return {} as any;
    }
    public TryGetAttribute(database?: Database, key?: string): Promise<string> {
        return {} as any;
    }
    public GetAttributes(database?: Database, keys?: string[]): Promise<{ [key: string]: string }> {
        return {} as any;
    }
    public SetAttribute(database?: Database, key?: string, value?: string): Promise<void> {
        return {} as any;
    }
    public SetAttributes(database?: Database, attributes?: { [key: string]: string }): Promise<void> {
        return {} as any;
    }
    public GetOrCreateAttribute(database?: Database, key?: string, onValue?: (()=>string)): Promise<string> {
        return {} as any;
    }
    public Upadte(database?: Database): Promise<void> {
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
    public static New(): NodeInstanceInterface {
        return {} as any;
    }
    public static op_Implicit(target?: any | NodeInstanceInterface): NodeInstanceInterface | any {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Node(): Guid {
        return {} as any;
    }
    public set Node(value: Guid) {
    }
    public get Major(): number {
        return {} as any;
    }
    public set Major(value: number) {
    }
    public get Minor(): number {
        return {} as any;
    }
    public set Minor(value: number) {
    }
    public get Build(): number {
        return {} as any;
    }
    public set Build(value: number) {
    }
    public get Revision(): number {
        return {} as any;
    }
    public set Revision(value: number) {
    }
    public get DataSet(): Guid {
        return {} as any;
    }
    public set DataSet(value: Guid) {
    }
    public get Components(): Guid {
        return {} as any;
    }
    public set Components(value: Guid) {
    }
    public get References(): Guid {
        return {} as any;
    }
    public set References(value: Guid) {
    }
    public get Attributes(): Guid {
        return {} as any;
    }
    public set Attributes(value: Guid) {
    }
    public get Version(): Version {
        return {} as any;
    }
    public set Version(value: Version) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}