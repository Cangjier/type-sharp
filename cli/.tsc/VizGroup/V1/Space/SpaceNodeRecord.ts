import { DateTime } from "../../../System/DateTime";
import { ServiceScope } from "../ServiceScope";
import { Type } from "../../../System/Type";
export class SpaceNodeRecord {
    public ToString(): string {
        return {} as any;
    }
    public AddChildren(scope?: ServiceScope, records?: SpaceNodeRecord[]): Promise<void> {
        return {} as any;
    }
    public RemoveChildren(scope?: ServiceScope, recordKeys?: string[]): Promise<void> {
        return {} as any;
    }
    public ClearChildren(scope?: ServiceScope): Promise<void> {
        return {} as any;
    }
    public GetType(): Type {
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
    public static op_Implicit(target?: any | SpaceNodeRecord): SpaceNodeRecord | any {
        return {} as any;
    }
    public static GetSpaceNode(scope?: ServiceScope, nodeInterfaceKey?: string): Promise<SpaceNodeRecord> {
        return {} as any;
    }
    public Target: any;
    public get key(): string {
        return {} as any;
    }
    public set key(value: string) {
    }
    public get DataUri(): string {
        return {} as any;
    }
    public set DataUri(value: string) {
    }
    public get ContentLength(): number {
        return {} as any;
    }
    public set ContentLength(value: number) {
    }
    public get ModifiedTime(): DateTime {
        return {} as any;
    }
    public set ModifiedTime(value: DateTime) {
    }
    public get Children(): any {
        return {} as any;
    }
    public get Name(): string {
        return {} as any;
    }
    public get User(): string {
        return {} as any;
    }
}