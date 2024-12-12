import { Type } from "../../../System/Type";
import { Database } from "../Database";
export class StringHashSet {
    public New(value?: string): Promise<number> {
        return {} as any;
    }
    public Borrow(value?: string): Promise<number> {
        return {} as any;
    }
    public Increase(recordAddress?: number): Promise<void> {
        return {} as any;
    }
    public Release(recordAddress?: number): Promise<void> {
        return {} as any;
    }
    public Read(recordAddress?: number): Promise<string> {
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
    public constructor(database?: Database, hashTableAddress?: number) {
    }
    public static get Debug(): boolean {
        return {} as any;
    }
    public static set Debug(value: boolean) {
    }
}