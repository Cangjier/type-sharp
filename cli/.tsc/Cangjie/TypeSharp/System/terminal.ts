import { terminalWrapper } from "./terminalWrapper";
import { terminalOptions } from "./terminalOptions";
import { Guid } from "../../../System/Guid";
import { Type } from "../../../System/Type";
export class terminal {
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
    public static create(options?: terminalOptions): terminalWrapper {
        return {} as any;
    }
    public static close(id?: Guid): void {
        return {} as any;
    }
    public static get(id?: Guid): terminalWrapper {
        return {} as any;
    }
    public static list(): Guid[] {
        return {} as any;
    }
}