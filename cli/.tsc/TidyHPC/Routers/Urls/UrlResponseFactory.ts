import { TextHtml } from "./Responses/TextHtml";
import { ApplicationJson } from "./Responses/ApplicationJson";
import { Attachment } from "./Responses/Attachment";
import { StreamAttachment } from "./Responses/StreamAttachment";
import { Stream } from "../../../System/IO/Stream";
import { MultiplyStreamAttachment } from "./Responses/MultiplyStreamAttachment";
import { ResponseStatusCode } from "./Responses/ResponseStatusCode";
import { NoneResponse } from "./Responses/NoneResponse";
import { Type } from "../../../System/Type";
export class UrlResponseFactory {
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
    public static CreateText(content?: string, contentEncoding?: string): TextHtml {
        return {} as any;
    }
    public static CreateHtml(content?: string, contentEncoding?: string): TextHtml {
        return {} as any;
    }
    public static CreateApplicationJson(content?: any, contentEncoding?: string): ApplicationJson {
        return {} as any;
    }
    public static CreateAttachment(filePath_or_stream_or_streams?: string | Stream | Stream[], fileName?: string, relativeFilePath_or_contentEncoding?: string, contentEncoding?: string): Attachment | StreamAttachment | MultiplyStreamAttachment {
        return {} as any;
    }
    public static CreateStatusCode(statusCode?: number): ResponseStatusCode {
        return {} as any;
    }
    public static CreateNone(): NoneResponse {
        return {} as any;
    }
}