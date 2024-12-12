import { Guid } from "../../../System/Guid";
import { DateTime } from "../../../System/DateTime";
import { ObjectInterface } from "../../../TidyHPC/LiteDB/ObjectInterface";
import { Database } from "../../../TidyHPC/LiteDB/Database";
import { String } from "../../../System/String";
import { Type } from "../../../System/Type";
export class FileInterface {
    public ForeachChunkMD5Set(database?: Database, onChunkMD5?: ((arg0?:string)=>void)): Promise<void> {
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
    public constructor(target?: any) {
    }
    public static op_Implicit(target?: any | FileInterface): FileInterface | any {
        return {} as any;
    }
    public static New(): FileInterface {
        return {} as any;
    }
    public static Allocate(database?: Database, fileName?: string, fileMD5?: string, fullContentMD5?: string, contentMD5Set?: string[], expirationDateTime?: DateTime): Promise<FileInterface> {
        return {} as any;
    }
    public Target?: any;
    public get id(): Guid {
        return {} as any;
    }
    public set id(value: Guid) {
    }
    public get FileName(): string {
        return {} as any;
    }
    public set FileName(value: string) {
    }
    public get RegisterTime(): DateTime {
        return {} as any;
    }
    public set RegisterTime(value: DateTime) {
    }
    public get ChunkMD5Set(): Guid {
        return {} as any;
    }
    public set ChunkMD5Set(value: Guid) {
    }
    public get FullContentMD5(): string {
        return {} as any;
    }
    public set FullContentMD5(value: string) {
    }
    public get FileMD5(): string {
        return {} as any;
    }
    public set FileMD5(value: string) {
    }
    public get ExpirationDateTime(): DateTime {
        return {} as any;
    }
    public set ExpirationDateTime(value: DateTime) {
    }
    public get UploadStatus(): number {
        return {} as any;
    }
    public set UploadStatus(value: number) {
    }
    public get LastUploadDateTime(): DateTime {
        return {} as any;
    }
    public set LastUploadDateTime(value: DateTime) {
    }
    public static get Interface(): ObjectInterface {
        return {} as any;
    }
}