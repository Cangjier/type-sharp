import { StatisticalBlock } from "./StatisticalBlock";
import { Database } from "../Database";
import { Byte } from "../../../System/Byte";
import { Int32 } from "../../../System/Int32";
import { Type } from "../../../System/Type";
export class StatisticalRegionVisitor {
    public Read(table?: Database, onBuffer?: ((arg0?:number[], arg1?:number)=>void)): Promise<void> {
        return {} as any;
    }
    public Write(table?: Database, onBuffer?: ((arg0?:number[], arg1?:number)=>void)): Promise<void> {
        return {} as any;
    }
    public Update(table?: Database, onBuffer?: ((arg0?:number[], arg1?:number)=>boolean)): Promise<void> {
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
    public constructor(block?: StatisticalBlock) {
    }
    public get Block(): StatisticalBlock {
        return {} as any;
    }
}