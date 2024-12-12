import { Guid } from "../../../System/Guid";
import { ArrayGuidInterface } from "./ArrayGuidInterface";
import { Type } from "../../../System/Type";
import { Database } from "../../../TidyHPC/LiteDB/Database";
export class ArrayGuidVisitor {
    public ForeachArray(action?: ((arg0?:ArrayGuidInterface)=>void) | ((arg0?:ArrayGuidInterface)=>boolean)): Promise<void> {
        return {} as any;
    }
    public GetLength(): Promise<number> {
        return {} as any;
    }
    public Foreach(onElement?: ((arg0?:Guid)=>void)): Promise<void> {
        return {} as any;
    }
    public Get(result?: Guid[]): Promise<void> {
        return {} as any;
    }
    public GetFirst(): Promise<Guid> {
        return {} as any;
    }
    public Allocate(): Promise<ArrayGuidInterface> {
        return {} as any;
    }
    public Add(elements?: Guid[]): Promise<void> {
        return {} as any;
    }
    public Remove(elements?: Guid[]): Promise<void> {
        return {} as any;
    }
    public Clear(): Promise<void> {
        return {} as any;
    }
    public Contains(element?: Guid): Promise<boolean> {
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
    public constructor(database?: Database, id?: Guid, onIdNew?: ((arg0?:Guid)=>Promise<void>)) {
    }
    public Database: Database;
}