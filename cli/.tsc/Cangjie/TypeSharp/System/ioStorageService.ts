import { IOStorageService } from "../../../VizGroup/V1/IOStorage/IOStorageService";
import { FileInterface } from "../../../VizGroup/V1/IOStorage/FileInterface";
import { ContentInterface } from "../../../VizGroup/V1/IOStorage/ContentInterface";
import { Type } from "../../../System/Type";
export class ioStorageService {
    public importFile(filePath?: string): Promise<FileInterface> {
        return {} as any;
    }
    public importString(value?: string): Promise<ContentInterface> {
        return {} as any;
    }
    public containsContentByMD5(contentMD5?: string): Promise<boolean> {
        return {} as any;
    }
    public exportContentToFilePath(contentMD5?: string, filePath?: string): Promise<void> {
        return {} as any;
    }
    public exportFileToFilePath(fileMD5?: string, filePath?: string): Promise<void> {
        return {} as any;
    }
    public readContent(contentMD5?: string): Promise<string> {
        return {} as any;
    }
    public getFileByID(fileID?: any): Promise<FileInterface> {
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
    public constructor(target?: IOStorageService) {
    }
    public get Target(): IOStorageService {
        return {} as any;
    }
}