import { Type } from "../../../System/Type";
export class terminalOptions {
    public static op_Implicit(target?: any): terminalOptions {
        return {} as any;
    }
    public shell?: string;
    public workingDirectory?: string;
    public environmentVariables?: any;
    public columns?: number;
    public rows?: number;
}