import { Guid } from "../../../../System/Guid";
import { ProcessorInterface } from "./ProcessorInterface";
import { TaskStatuses } from "./TaskStatuses";
import { TraceInterface } from "../../../../TidyHPC/LiteJson/TraceInterface";
import { Type } from "../../../../System/Type";
export class TaskInterface {
    public Dispose(): void {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
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
    public static op_Implicit(task?: TaskInterface | any): any | TaskInterface {
        return {} as any;
    }
    public get Target(): any {
        return {} as any;
    }
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get Input(): any {
        return {} as any;
    }
    public set Input(value: any) {
    }
    public get Output(): any {
        return {} as any;
    }
    public set Output(value: any) {
    }
    public get Receiver(): any {
        return {} as any;
    }
    public get Processor(): ProcessorInterface {
        return {} as any;
    }
    public get Status(): TaskStatuses {
        return {} as any;
    }
    public set Status(value: TaskStatuses) {
    }
    public get Trace(): TraceInterface {
        return {} as any;
    }
}