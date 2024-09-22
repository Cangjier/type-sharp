import { Json } from "./Json";
import { Exception } from "../../System/Exception";
import { Levels } from "../Loggers/Logger+Levels";
import { Type } from "../../System/Type";
export class TraceInterface {
    public get Message(): string {
        return {} as any;
    }
    public set Message(value: string) {
    }
    public get ErrorLogger(): Json {
        return {} as any;
    }
    public get InfoLogger(): Json {
        return {} as any;
    }
    public get DebugLogger(): Json {
        return {} as any;
    }
    public Target: Json;
    public Error(message?: string, exception?: Exception): void {
        return {} as any;
    }
    public Info(message?: string, exception?: Exception): void {
        return {} as any;
    }
    public Update(trace?: TraceInterface): void {
        return {} as any;
    }
    public Log(level?: Levels, message?: string, exception?: Exception, popOuterFunctionCount?: number, showTrace?: boolean): void {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(target?: Json) {
    }
    public static op_Implicit(trace_or_target?: TraceInterface | Json): Json | TraceInterface {
        return {} as any;
    }
}