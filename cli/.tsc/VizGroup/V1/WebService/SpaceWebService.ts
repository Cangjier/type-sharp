import { SpaceService } from "../Space/SpaceService";
import { Session } from "../../../TidyHPC/Routers/Urls/Session";
import { Type } from "../../../System/Type";
export class SpaceWebService {
    public Get(session?: Session, key?: string): Promise<any> {
        return {} as any;
    }
    public AddDirectory(session?: Session, key?: string, name?: string): Promise<any> {
        return {} as any;
    }
    public AddFile(session?: Session, key?: string, name?: string, uri?: string): Promise<any> {
        return {} as any;
    }
    public Delete(session?: Session, key?: string): Promise<boolean> {
        return {} as any;
    }
    public Clear(session?: Session, key?: string): Promise<boolean> {
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
    public constructor(spaceService?: SpaceService) {
    }
    public get SpaceService(): SpaceService {
        return {} as any;
    }
}