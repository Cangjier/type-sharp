import { processResult } from "./processResult";
import { processConfig } from "./processConfig";
import { Guid } from "../../../System/Guid";
import { DateTime } from "../../../System/DateTime";
import { Type } from "../../../System/Type";
export class staticContext {
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
    public static exec(config?: processConfig): processResult {
        return {} as any;
    }
    public static execAsync(config?: processConfig): Promise<processResult> {
        return {} as any;
    }
    public static start(config?: processConfig): number {
        return {} as any;
    }
    public static kill(pid?: number): void {
        return {} as any;
    }
    public static cmd(workingDirectory?: string, commandLine?: string, config?: processConfig): processResult {
        return {} as any;
    }
    public static cmdAsync(workingDirectory?: string, commandLine?: string, config?: processConfig): Promise<processResult> {
        return {} as any;
    }
    public static startCmd(workingDirectory?: string, commandLine?: string): void {
        return {} as any;
    }
    public static parseFloat(value?: string): number {
        return {} as any;
    }
    public static parseInt(value?: string): number {
        return {} as any;
    }
    public static isNaN(value?: any): boolean {
        return {} as any;
    }
    public static toString(value?: any): string {
        return {} as any;
    }
    public static Number(value?: any): any {
        return {} as any;
    }
    public static copyDirectory(sourceDirectory?: string, destinationDirectory?: string): void {
        return {} as any;
    }
    public static deleteFile(sourcePath?: string): void {
        return {} as any;
    }
    public static deleteDirectory(sourceDirectory?: string): void {
        return {} as any;
    }
    public static locate(searchDirectory?: string, path?: string): string {
        return {} as any;
    }
    public static lock(id?: Guid): void {
        return {} as any;
    }
    public static lockAsync(id?: Guid): Promise<void> {
        return {} as any;
    }
    public static unlock(id?: Guid): void {
        return {} as any;
    }
    public static lockFile(filePath?: string): boolean {
        return {} as any;
    }
    public static unlockFile(filePath?: string): boolean {
        return {} as any;
    }
    public static env(environmentVariable?: string): string {
        return {} as any;
    }
    public static md5(value?: any): string {
        return {} as any;
    }
    public static toDateTime(value?: any): DateTime {
        return {} as any;
    }
    public static null: any;
    public static undefined: any;
}