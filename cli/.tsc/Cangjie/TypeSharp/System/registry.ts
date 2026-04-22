import { registryValue } from "./registryValue";
import { Type } from "../../../System/Type";
export class registry {
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
    public static get(registryPath?: string, key?: string): registryValue {
        return {} as any;
    }
    public static set(registryPath?: string, key_or_value?: string | registryValue, value?: registryValue): void {
        return {} as any;
    }
}