import { Database } from "../../../TidyHPC/LiteDB/Database";
import { ContentInterface } from "./ContentInterface";
import { Stream } from "../../../System/IO/Stream";
import { FileStream } from "../../../System/IO/FileStream";
import { FileInterface } from "./FileInterface";
import { DateTime } from "../../../System/DateTime";
import { Guid } from "../../../System/Guid";
import { Type } from "../../../System/Type";
export class IOStorageService {
    public RegisterInterfaces(): Promise<void> {
        return {} as any;
    }
    public ContainsContent(contentMD5?: string): Promise<boolean> {
        return {} as any;
    }
    public ChangeContentReference(contentMD5?: string, delta?: number): Promise<void> {
        return {} as any;
    }
    public GetContent(contentMD5?: string): Promise<ContentInterface> {
        return {} as any;
    }
    public GetOrCreateContent(contentMD5?: string): Promise<ContentInterface> {
        return {} as any;
    }
    public ImportContent(stream?: Stream, contentMD5?: string): Promise<ContentInterface> {
        return {} as any;
    }
    public ExportContent(contentMD5?: string, outputStream?: Stream): Promise<void> {
        return {} as any;
    }
    public GetContentStream(contentMD5?: string): FileStream {
        return {} as any;
    }
    public ImportFile(fileName?: string, fileMD5?: string, fullcontentMD5?: string, contentMD5Set?: string[], expirationDateTime?: DateTime): Promise<FileInterface> {
        return {} as any;
    }
    public ContainsFile(fileMD5_or_fileId?: string | Guid): Promise<boolean> {
        return {} as any;
    }
    public GetFile(fileMD5_or_id?: string | Guid): Promise<FileInterface> {
        return {} as any;
    }
    public GetChunkMD5Set(file_or_fileId?: FileInterface | Guid): Promise<string[]> {
        return {} as any;
    }
    public Update(file?: FileInterface): Promise<void> {
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
    public constructor(database?: Database) {
    }
    public get Database(): Database {
        return {} as any;
    }
    public get CacheDirectory(): string {
        return {} as any;
    }
    public set CacheDirectory(value: string) {
    }
    public get TempDirectory(): string {
        return {} as any;
    }
    public get ArchiveDirectory(): string {
        return {} as any;
    }
}