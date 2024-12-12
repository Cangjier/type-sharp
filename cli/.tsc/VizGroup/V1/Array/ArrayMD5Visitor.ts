import { ArrayMD5Interface } from "./ArrayMD5Interface";
import { String } from "../../../System/String";
import { Type } from "../../../System/Type";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { Guid } from "../../../System/Guid";
export class ArrayMD5Visitor {
    public ForeachArray(action?: ((arg0?:ArrayMD5Interface)=>void) | ((arg0?:ArrayMD5Interface)=>boolean)): Promise<void> {
        return {} as any;
    }
    public GetLength(): Promise<number> {
        return {} as any;
    }
    public Foreach(onElement?: ((arg0?:string)=>void)): Promise<void> {
        return {} as any;
    }
    public Get(result?: string[]): Promise<void> {
        return {} as any;
    }
    public GetFirst(): Promise<string> {
        return {} as any;
    }
    public Allocate(): Promise<ArrayMD5Interface> {
        return {} as any;
    }
    public Add(elements?: string[]): Promise<void> {
        return {} as any;
    }
    public Remove(elements?: string[]): Promise<void> {
        return {} as any;
    }
    public Clear(): Promise<void> {
        return {} as any;
    }
    public Contains(element?: string): Promise<boolean> {
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