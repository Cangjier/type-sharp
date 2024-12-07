import { Database } from "../../TidyHPC/LiteDB/Database";
import { AssemblyService } from "./Assembly/AssemblyService";
import { PDMService } from "./PDM/PDMService";
import { SpaceService } from "./Space/SpaceService";
import { IOStorageService } from "./IOStorage/IOStorageService";
import { UserService } from "./Users/UserService";
import { TaskService } from "./TaskQueues/TaskService";
import { PackageService } from "./Package/PackageService";
import { Type } from "../../System/Type";
export class ServiceScope {
    public RegisterInterfaces(): Promise<void> {
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
    public constructor(database?: Database) {
    }
    public get Database(): Database {
        return {} as any;
    }
    public get AssemblyService(): AssemblyService {
        return {} as any;
    }
    public get PDMService(): PDMService {
        return {} as any;
    }
    public get SpaceService(): SpaceService {
        return {} as any;
    }
    public get IOStorageService(): IOStorageService {
        return {} as any;
    }
    public get UserService(): UserService {
        return {} as any;
    }
    public get TaskService(): TaskService {
        return {} as any;
    }
    public get PackageService(): PackageService {
        return {} as any;
    }
}