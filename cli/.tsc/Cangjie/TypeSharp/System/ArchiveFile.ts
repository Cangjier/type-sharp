import { Archive } from "./Archive";
import { ZipArchiveEntry } from "../../../System/IO/Compression/ZipArchiveEntry";
import { Stream } from "../../../System/IO/Stream";
import { Type } from "../../../System/Type";
export class ArchiveFile {
    public Open(): Stream {
        return {} as any;
    }
    public WriteStream(stream?: Stream): void {
        return {} as any;
    }
    public WriteString(content?: string): void {
        return {} as any;
    }
    public WriteBytes(buffer?: number[]): void {
        return {} as any;
    }
    public ReadAsString(): string {
        return {} as any;
    }
    public ReadAsBytes(): number[] {
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