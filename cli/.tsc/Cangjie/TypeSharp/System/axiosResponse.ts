import { String } from "../../../System/String";
import { HttpResponseMessage } from "../../../System/Net/Http/HttpResponseMessage";
import { axiosConfig } from "./axiosConfig";
import { Context } from "./Context";
import { Type } from "../../../System/Type";
export class axiosResponse {
    public setResponse(response?: HttpResponseMessage, config?: axiosConfig, context?: Context): Promise<void> {
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
    public constructor() {
    }
    public get data(): any {
        return {} as any;
    }
    public set data(value: any) {
    }
    public get headers(): { [key: string]: string } {
        return {} as any;
    }
    public get status(): number {
        return {} as any;
    }
    public set status(value: number) {
    }
    public get statusText(): string {
        return {} as any;
    }
    public set statusText(value: string) {
    }
}