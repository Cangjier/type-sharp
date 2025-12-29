import { UrlRouter } from "./UrlRouter";
import { String } from "../../../System/String";
import { Session } from "./Session";
import { Task } from "../../../System/Threading/Tasks/Task";
import { Json } from "../../LiteJson/Json";
import { Exception } from "../../../System/Exception";
import { Type } from "../../../System/Type";
export class UrlRouterEvents {
    public add_OnNoRoute(value?: ((arg0?:string, arg1?:Session)=>Promise<void>)): void {
        return {} as any;
    }
    public remove_OnNoRoute(value?: ((arg0?:string, arg1?:Session)=>Promise<void>)): void {
        return {} as any;
    }
    public add_OnException(value?: ((arg0?:Session, arg1?:string, arg2?:Exception)=>Promise<void>)): void {
        return {} as any;
    }
    public remove_OnException(value?: ((arg0?:Session, arg1?:string, arg2?:Exception)=>Promise<void>)): void {
        return {} as any;
    }
    public OnExceptionInvoke(session?: Session, message?: string, exception?: Exception): Promise<void> {
        return {} as any;
    }
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
    public constructor(urlRouter?: UrlRouter) {
    }
    public get UrlRouter(): UrlRouter {
        return {} as any;
    }
    public get OnBeforeRouteAsync(): ((arg0?:string, arg1?:Session)=>Promise<boolean>) {
        return {} as any;
    }
    public set OnBeforeRouteAsync(value: ((arg0?:string, arg1?:Session)=>Promise<boolean>)) {
    }
    public get OnBeforeHandlerAsync(): ((arg0?:string, arg1?:Session)=>Promise<boolean>) {
        return {} as any;
    }
    public set OnBeforeHandlerAsync(value: ((arg0?:string, arg1?:Session)=>Promise<boolean>)) {
    }
    public get OnAfterHandler(): ((arg0?:string, arg1?:Session)=>Promise<void>) {
        return {} as any;
    }
    public set OnAfterHandler(value: ((arg0?:string, arg1?:Session)=>Promise<void>)) {
    }
    public get HandleNoRoute(): ((arg0?:string, arg1?:Session)=>Promise<void>) {
        return {} as any;
    }
    public set HandleNoRoute(value: ((arg0?:string, arg1?:Session)=>Promise<void>)) {
    }
    public get OnResponseJsonGenerated(): ((arg0?:Session, arg1?:any)=>Promise<void>) {
        return {} as any;
    }
    public set OnResponseJsonGenerated(value: ((arg0?:Session, arg1?:any)=>Promise<void>)) {
    }
    public get HandleException(): ((arg0?:Session, arg1?:string, arg2?:Exception)=>Promise<void>) {
        return {} as any;
    }
    public set HandleException(value: ((arg0?:Session, arg1?:string, arg2?:Exception)=>Promise<void>)) {
    }
}