import { Type } from "../../../../System/Type";
export class PerformanceInterface {
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
    public static op_Implicit(target?: PerformanceInterface | any): any | PerformanceInterface {
        return {} as any;
    }
    public static GetTotalProcessorTimePercent(): number {
        return {} as any;
    }
    public static GetProcessorTimePercent(index?: number): number {
        return {} as any;
    }
    public static GetMemoryAvailableBytes(): number {
        return {} as any;
    }
    public static GetCommittedBytesInUsePercent(): number {
        return {} as any;
    }
    public static GetCurrent(): PerformanceInterface {
        return {} as any;
    }
    public Target?: any;
    public get TotalProcessorTimePercent(): number {
        return {} as any;
    }
    public set TotalProcessorTimePercent(value: number) {
    }
    public get ProcessorCount(): number {
        return {} as any;
    }
    public set ProcessorCount(value: number) {
    }
    public get MemoryAvailableBytes(): number {
        return {} as any;
    }
    public set MemoryAvailableBytes(value: number) {
    }
    public get CommittedBytesInUsePercent(): number {
        return {} as any;
    }
    public set CommittedBytesInUsePercent(value: number) {
    }
    public get Processors(): CPUProcessorInterface[] {
        return {} as any;
    }
    public set Processors(value: CPUProcessorInterface[]) {
    }
}