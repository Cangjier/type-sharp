import { axiosResponse } from "./axiosResponse";
import { axiosConfig } from "./axiosConfig";
import { String } from "../../../System/String";
import { Int64 } from "../../../System/Int64";
import { Nullable } from "../../../System/Nullable";
import { Type } from "../../../System/Type";
import { Context } from "./Context";
export class Axios {
    public setProxy(proxy?: string): void {
        return {} as any;
    }
    public unsetProxy(): void {
        return {} as any;
    }
    public setDefaultProxy(): void {
        return {} as any;
    }
    public get(url?: string, config?: axiosConfig): Promise<axiosResponse> {
        return {} as any;
    }
    public delete(url?: string, config?: axiosConfig): Promise<axiosResponse> {
        return {} as any;
    }
    public post(url?: string, data?: any, config?: axiosConfig): Promise<axiosResponse> {
        return {} as any;
    }
    public put(url?: string, data?: any, config?: axiosConfig): Promise<axiosResponse> {
        return {} as any;
    }
    public patch(url?: string, data?: any, config?: axiosConfig): Promise<axiosResponse> {
        return {} as any;
    }
    public download(url?: string, path_or_onPath?: string | ((arg0?:string)=>string), onProgress?: ((arg0?:number, arg1?:any)=>void)): Promise<string> {
        return {} as any;
    }
    public Dispose(): void {
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
    public constructor(context?: Context) {
    }
}