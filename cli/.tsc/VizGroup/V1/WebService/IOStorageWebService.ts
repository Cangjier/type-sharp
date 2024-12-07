import { IOStorageService } from "../IOStorage/IOStorageService";
import { Stream } from "../../../System/IO/Stream";
import { MultiplyStreamAttachment } from "../../../TidyHPC/Routers/Urls/Responses/MultiplyStreamAttachment";
import { Guid } from "../../../System/Guid";
import { Type } from "../../../System/Type";
export class IOStorageWebService {
    public Upload(file?: Stream, fileName?: string, fileMD5?: string, contentMD5?: string): Promise<string> {
        return {} as any;
    }
    public Download(fileId?: Guid): Promise<MultiplyStreamAttachment> {
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
    public constructor(ioStorageService?: IOStorageService) {
    }
    public get IOStorageService(): IOStorageService {
        return {} as any;
    }
}