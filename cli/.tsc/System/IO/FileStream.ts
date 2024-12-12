import { CancellationToken } from "../Threading/CancellationToken";
import { ValueTask } from "../Threading/Tasks/ValueTask";
import { SafeFileHandle } from "../../Microsoft/Win32/SafeHandles/SafeFileHandle";
import { Stream } from "./Stream";
import { IAsyncResult } from "../IAsyncResult";
import { AsyncCallback } from "../AsyncCallback";
import { SeekOrigin } from "./SeekOrigin";
import { Type } from "../Type";
import { FileAccess } from "./FileAccess";
import { FileMode } from "./FileMode";
import { FileShare } from "./FileShare";
import { FileOptions } from "./FileOptions";
import { FileStreamOptions } from "./FileStreamOptions";
export class FileStream {
    public Lock(position?: number, length?: number): void {
        return {} as any;
    }
    public Unlock(position?: number, length?: number): void {
        return {} as any;
    }
    public FlushAsync(cancellationToken?: CancellationToken): Promise<void> {
        return {} as any;
    }
    public Read(buffer?: number[], offset?: number, count?: number): number {
        return {} as any;
    }
    public ReadAsync(buffer?: number[], offset?: number, count?: number, cancellationToken?: CancellationToken): Promise<number> {
        return {} as any;
    }
    public Write(buffer?: number[], offset?: number, count?: number): void {
        return {} as any;
    }
    public WriteAsync(buffer?: number[], offset?: number, count?: number, cancellationToken?: CancellationToken): Promise<void> {
        return {} as any;
    }
    public Flush(flushToDisk?: boolean): void {
        return {} as any;
    }
    public SetLength(value?: number): void {
        return {} as any;
    }
    public ReadByte(): number {
        return {} as any;
    }
    public WriteByte(value?: number): void {
        return {} as any;
    }
    public DisposeAsync(): ValueTask {
        return {} as any;
    }
    public CopyTo(destination?: Stream, bufferSize?: number): void {
        return {} as any;
    }
    public CopyToAsync(destination?: Stream, bufferSize_or_cancellationToken?: number | CancellationToken, cancellationToken?: CancellationToken): Promise<void> {
        return {} as any;
    }
    public BeginRead(buffer?: number[], offset?: number, count?: number, callback?: AsyncCallback, state?: any): IAsyncResult {
        return {} as any;
    }
    public EndRead(asyncResult?: IAsyncResult): number {
        return {} as any;
    }
    public BeginWrite(buffer?: number[], offset?: number, count?: number, callback?: AsyncCallback, state?: any): IAsyncResult {
        return {} as any;
    }
    public EndWrite(asyncResult?: IAsyncResult): void {
        return {} as any;
    }
    public Seek(offset?: number, origin?: SeekOrigin): number {
        return {} as any;
    }
    public Dispose(): void {
        return {} as any;
    }
    public Close(): void {
        return {} as any;
    }
    public ReadExactlyAsync(buffer?: number[], offset?: number, count?: number, cancellationToken?: CancellationToken): ValueTask {
        return {} as any;
    }
    public ReadExactly(buffer?: number[], offset?: number, count?: number): void {
        return {} as any;
    }
    public GetLifetimeService(): any {
        return {} as any;
    }
    public InitializeLifetimeService(): any {
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
    public constructor(handle_or_path?: number | SafeFileHandle | string, access_or_mode_or_options?: FileAccess | FileMode | FileStreamOptions, ownsHandle_or_bufferSize_or_access?: boolean | number | FileAccess, bufferSize_or_isAsync_or_share?: number | boolean | FileShare, isAsync_or_bufferSize?: boolean | number, useAsync_or_options?: boolean | FileOptions) {
    }
    public get Handle(): number {
        return {} as any;
    }
    public get CanRead(): boolean {
        return {} as any;
    }
    public get CanWrite(): boolean {
        return {} as any;
    }
    public get SafeFileHandle(): SafeFileHandle {
        return {} as any;
    }
    public get Name(): string {
        return {} as any;
    }
    public get IsAsync(): boolean {
        return {} as any;
    }
    public get Length(): number {
        return {} as any;
    }
    public get Position(): number {
        return {} as any;
    }
    public set Position(value: number) {
    }
    public get CanSeek(): boolean {
        return {} as any;
    }
    public get CanTimeout(): boolean {
        return {} as any;
    }
    public get ReadTimeout(): number {
        return {} as any;
    }
    public set ReadTimeout(value: number) {
    }
    public get WriteTimeout(): number {
        return {} as any;
    }
    public set WriteTimeout(value: number) {
    }
}