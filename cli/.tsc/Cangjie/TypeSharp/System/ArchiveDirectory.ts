import { Archive } from "./Archive";
import { ZipArchiveEntry } from "../../../System/IO/Compression/ZipArchiveEntry";
import { ArchiveFile } from "./ArchiveFile";
import { Type } from "../../../System/Type";
export class ArchiveDirectory {
    public Contains(fileName?: string): boolean {
        return {} as any;
    }
    public GetFiles(): ArchiveFile[] {
        return {} as any;
    }
    public GetDirectories(): ArchiveDirectory[] {
        return {} as any;
    }
    public GetOrCreateFile(fileName?: string): ArchiveFile {
        return {} as any;
    }
    public GetOrCreateDirectory(directoryName?: string): ArchiveDirectory {
        return {} as any;
    }
    public Delete(): void {
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
    public constructor(archive?: Archive, zipArchiveEntry?: ZipArchiveEntry, filePath?: string) {
    }
    public get Archive(): Archive {
        return {} as any;
    }
    public get ZipArchiveEntry(): ZipArchiveEntry {
        return {} as any;
    }
    public get FilePath(): string {
        return {} as any;
    }
}