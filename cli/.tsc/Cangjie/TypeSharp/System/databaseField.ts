import { Type } from "../../../System/Type";
export class databaseField {
    public static op_Implicit(target?: any): databaseField {
        return {} as any;
    }
    public Target?: any;
    public name?: string;
    public type?: string;
    public isIndex?: boolean;
    public isIndeArray?: boolean;
    public isIndexSet?: boolean;
    public length?: number;
    public isMaster?: boolean;
}