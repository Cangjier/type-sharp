import { Database } from "../Database";
import { DBType } from "./DBType";
import { Type } from "../../../System/Type";
export class DBReferenceString {
    public Equals(db_or_obj?: Database | any, other?: DBType): Promise<boolean> | boolean {
        return {} as any;
    }
    public GetHashCode(db?: Database): Promise<number> | number {
        return {} as any;
    }
    public Read(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public Write(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(stringAddress?: number) {
    }
    public static GetSize(): number {
        return {} as any;
    }
    public StringAddress: number;
}