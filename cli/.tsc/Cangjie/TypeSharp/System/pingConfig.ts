import { Type } from "../../../System/Type";
export class pingConfig {
    public static op_Implicit(target?: any): pingConfig {
        return {} as any;
    }
    public timeout?: number;
    public count?: number;
    public proxy?: string;
}