import { pingConfig } from "./pingConfig";
import { Type } from "../../../System/Type";
export class netUtils {
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
    public static pingAsync(url?: string, config?: pingConfig): Promise<number> {
        return {} as any;
    }
    public static pingsAsync(urls?: string[], configs?: pingConfig[]): Promise<number[]> {
        return {} as any;
    }
    public static pingsWithConfigAsync(urls?: string[], config?: pingConfig): Promise<number> {
        return {} as any;
    }
    public static pingWithConfigsAsync(url?: string, configs?: pingConfig[]): Promise<number[]> {
        return {} as any;
    }
    public static pingsWithConfigsAsync(urls?: string[], configs?: pingConfig[]): Promise<number[]> {
        return {} as any;
    }
    public static getAvailableTcpPorts(count?: number): number[] {
        return {} as any;
    }
}