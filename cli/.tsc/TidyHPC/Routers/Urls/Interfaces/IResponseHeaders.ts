import { KeyValuePair`2 } from "../../../../System/Collections/Generic/KeyValuePair`2[[System/String, System/Private/CoreLib, Version=10/0/0/0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System/String, System/Private/CoreLib, Version=10/0/0/0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]";
import { ContentType } from "../Headers/ContentType";
import { CacheControlHeaderValue } from "../../../../System/Net/Http/Headers/CacheControlHeaderValue";
import { AuthenticationHeaderValue } from "../../../../System/Net/Http/Headers/AuthenticationHeaderValue";
import { ContentRangeHeaderValue } from "../../../../System/Net/Http/Headers/ContentRangeHeaderValue";
export class IResponseHeaders {
    [Symbol.iterator](): Iterator<{ Key: string, Value: string }> {
        return {} as any;
    }
    [index: number]: { Key: string, Value: string };
    public GetHeader(key?: string): string {
        return {} as any;
    }
    public SetHeader(key?: string, value?: string): void {
        return {} as any;
    }
    public BuildAttachmentHeaders(fileName?: string, contentEncoding?: string): void {
        return {} as any;
    }
    public get ContentType(): ContentType {
        return {} as any;
    }
    public set ContentType(value: ContentType) {
    }
    public get ContentDisposition(): string {
        return {} as any;
    }
    public set ContentDisposition(value: string) {
    }
    public get CacheControl(): CacheControlHeaderValue {
        return {} as any;
    }
    public set CacheControl(value: CacheControlHeaderValue) {
    }
    public get Authorization(): AuthenticationHeaderValue {
        return {} as any;
    }
    public set Authorization(value: AuthenticationHeaderValue) {
    }
    public get ContentRange(): ContentRangeHeaderValue {
        return {} as any;
    }
    public set ContentRange(value: ContentRangeHeaderValue) {
    }
    public get ContentEncoding(): string {
        return {} as any;
    }
    public set ContentEncoding(value: string) {
    }
}