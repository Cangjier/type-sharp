import { WebSocketEvent } from "./WebSocketEvent";
import { Type } from "../../../System/Type";
export class WebSocket {
    public Dispose(): void {
        return {} as any;
    }
    public onopen(e?: ((arg0?:WebSocketEvent)=>void)): void {
        return {} as any;
    }
    public onclose(e?: ((arg0?:WebSocketEvent)=>void)): void {
        return {} as any;
    }
    public onmessage(e?: ((arg0?:WebSocketEvent)=>void)): void {
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
    public constructor(url?: string) {
    }
    public static OPEN: string;
    public static CLOSE: string;
    public static MESSAGE: string;
}