import { Database } from "../Database";
import { RecordVisitor } from "./RecordVisitor";
import { RecordRegionVisitor } from "./RecordRegionVisitor";
import { Type } from "../../../System/Type";
export class ArrayBlock {
    public Initialize(table?: Database): Promise<void> {
        return {} as any;
    }
    public SetAddress(address?: number, recordSize?: number, blockSize?: number): void {
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
    public constructor() {
    }
    public get Address(): number {
        return {} as any;
    }
    public get RecordSize(): number {
        return {} as any;
    }
    public get BlockSize(): number {
        return {} as any;
    }
    public get RecordCount(): number {
        return {} as any;
    }
    public get FirstRecordAddress(): number {
        return {} as any;
    }
    public set FirstRecordAddress(value: number) {
    }
    public get RecordVisitor(): RecordVisitor {
        return {} as any;
    }
    public get RecordRegionVisitor(): RecordRegionVisitor {
        return {} as any;
    }
}