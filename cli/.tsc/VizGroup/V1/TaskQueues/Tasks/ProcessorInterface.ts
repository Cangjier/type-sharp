import { ProcessorTypes } from "./ProcessorTypes";
import { Type } from "../../../../System/Type";
export class ProcessorInterface {
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
    public static op_Implicit(target_or_processor?: any | ProcessorInterface): ProcessorInterface | any {
        return {} as any;
    }
    public Target?: any;
    public get Type(): ProcessorTypes {
        return {} as any;
    }
    public set Type(value: ProcessorTypes) {
    }
    public get Name(): string {
        return {} as any;
    }
    public set Name(value: string) {
    }
}