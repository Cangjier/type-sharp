import { Encoding } from "../../../System/Text/Encoding";
import { FileStream } from "../../../System/IO/FileStream";
import { ZipArchive } from "../../../System/IO/Compression/ZipArchive";
import { ArchiveDirectory } from "./ArchiveDirectory";
import { ArchiveFile } from "./ArchiveFile";
import { Type } from "../../../System/Type";
export class Archive {
    public Dispose(): void {
        return {} as any;
    }
    public Save(): void {
        return {} as any;
    }
    public GetRootDirectory(): ArchiveDirectory {
        return {} as any;
    }
    public GetFiles(): ArchiveFile[] {
        return {} as any;
    }
    public GetDirectories(): ArchiveDirectory[] {
        return {} as any;
    }
    public GetFileByPath(path?: string): ArchiveFile {
        return {} as any;
    }
    public GetOrCreateFileByPath(path?: string): ArchiveFile {
        return {} as any;
    }
    public GetDirectoryByPath(path?: string): ArchiveDirectory {
        return {} as any;
    }
    public GetOrCreateDirectoryByPath(path?: string): ArchiveDirectory {
        return {} as any;
    }
    public GetFilesByPath(path?: string): ArchiveFile[] {
        return {} as any;
    }
    public GetDirectoriesByPath(path?: string): ArchiveDirectory[] {
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
    public constructor(stream?: FileStream, filePath?: string, canBeDisposed?: boolean) {
    }
    public static Open(filePath?: string): Archive {
        return {} as any;
    }
    public static get DefaultEncoding(): Encoding {
        return {} as any;
    }
    public get Stream(): FileStream {
        return {} as any;
    }
    public get ZipArchive(): ZipArchive {
        return {} as any;
    }
    public get FilePath(): string {
        return {} as any;
    }
}