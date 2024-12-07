import { ServiceScope } from "../ServiceScope";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { SpaceNodeRecord } from "./SpaceNodeRecord";
import { Type } from "../../../System/Type";
export class SpaceService {
    public GetSpaceNode(key?: string): Promise<SpaceNodeRecord> {
        return {} as any;
    }
    public AddFile(parentKey?: string, fileName?: string, uri?: string): Promise<SpaceNodeRecord> {
        return {} as any;
    }
    public AddDirectory(parentKey?: string, directoryName?: string): Promise<SpaceNodeRecord> {
        return {} as any;
    }
    public Delete(key?: string): Promise<void> {
        return {} as any;
    }
    public ClearDirectory(key?: string): Promise<void> {
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
    public constructor(scope?: ServiceScope) {
    }
    public static NodeInterfaceType: string;
    public get Scope(): ServiceScope {
        return {} as any;
    }
    public get Database(): Database {
        return {} as any;
    }
}