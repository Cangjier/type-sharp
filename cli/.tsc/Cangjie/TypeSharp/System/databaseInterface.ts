import { databaseField } from "./databaseField";
import { Type } from "../../../System/Type";
export class databaseInterface {
    public static op_Implicit(target?: any): databaseInterface {
        return {} as any;
    }
    public Target?: any;
    public name?: string;
    public fields?: databaseField[];
}