import { IWebsocketResponse } from "../../../../TidyHPC/LiteHttpServer/IWebsocketResponse";
import { Type } from "../../../../System/Type";
export class ProgressSubscriber {
    public Complete(): void {
        return {} as any;
    }
    public SendMessage(message?: string): Promise<void> {
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
    public constructor() {
    }
    public get IsCloseAfterComplete(): boolean {
        return {} as any;
    }
    public set IsCloseAfterComplete(value: boolean) {
    }
    public get WebsocketResponse(): IWebsocketResponse {
        return {} as any;
    }
    public set WebsocketResponse(value: IWebsocketResponse) {
    }
}