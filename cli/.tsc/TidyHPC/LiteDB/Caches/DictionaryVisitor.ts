import { Cache } from "./Cache";
import { Database } from "../Database";
import { Type } from "../../../System/Type";
export class DictionaryVisitor {
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
    public constructor(cache?: Cache) {
    }
    public get Cache(): Cache {
        return {} as any;
    }
    public get Database(): Database {
        return {} as any;
    }
}