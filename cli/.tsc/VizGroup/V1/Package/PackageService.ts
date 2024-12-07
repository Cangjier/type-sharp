import { ServiceScope } from "../ServiceScope";
import { PackageInterface } from "./PackageInterface";
import { VersionFlag } from "./VersionFlag";
import { Type } from "../../../System/Type";
export class PackageService {
    public ContainsPackage(name?: string): Promise<boolean> {
        return {} as any;
    }
    public Upgrade(package?: PackageInterface, versionFlag?: VersionFlag): Promise<PackageInterface> {
        return {} as any;
    }
    public GetPackages(name?: string): Promise<PackageInterface[]> {
        return {} as any;
    }
    public GetLatestPackage(name?: string): Promise<PackageInterface> {
        return {} as any;
    }
    public GetLatestPackages(names?: string[]): Promise<PackageInterface[]> {
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
    public constructor(serviceScope?: ServiceScope) {
    }
    public get ServiceScope(): ServiceScope {
        return {} as any;
    }
}