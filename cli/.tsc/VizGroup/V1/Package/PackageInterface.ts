import { Version } from "../../../System/Version";
import { ServiceScope } from "../ServiceScope";
import { VersionFlag } from "./VersionFlag";
import { Type } from "../../../System/Type";
export class PackageInterface {
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
    public constructor(target?: any) {
    }
    public static op_Implicit(target?: PackageInterface | any): any | PackageInterface {
        return {} as any;
    }
    public static ContainsPackage(scope?: ServiceScope, name?: string, version?: Version): Promise<boolean> {
        return {} as any;
    }
    public static GetPackages(scope?: ServiceScope, name?: string): Promise<PackageInterface[]> {
        return {} as any;
    }
    public static GetPackage(scope?: ServiceScope, name?: string, version?: Version): Promise<PackageInterface> {
        return {} as any;
    }
    public static CreatePackage(scope?: ServiceScope, package?: PackageInterface): Promise<void> {
        return {} as any;
    }
    public static UpgradePackage(scope?: ServiceScope, package?: PackageInterface, versionFlag?: VersionFlag): Promise<PackageInterface> {
        return {} as any;
    }
    public static GetLatestPackage(scope?: ServiceScope, name?: string): Promise<PackageInterface> {
        return {} as any;
    }
    public static GetLatestPackages(scope?: ServiceScope, names?: string[]): Promise<PackageInterface[]> {
        return {} as any;
    }
    public static GetAllPackages(scope?: ServiceScope): Promise<PackageInterface[]> {
        return {} as any;
    }
    public Target?: any;
    public get Name(): string {
        return {} as any;
    }
    public set Name(value: string) {
    }
    public get Version(): Version {
        return {} as any;
    }
    public set Version(value: Version) {
    }
    public get Author(): string {
        return {} as any;
    }
    public set Author(value: string) {
    }
    public get Description(): string {
        return {} as any;
    }
    public set Description(value: string) {
    }
    public get DataUri(): string {
        return {} as any;
    }
    public set DataUri(value: string) {
    }
}