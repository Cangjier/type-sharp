import { Stream } from "../../../../System/IO/Stream";
import { MultiplyStreamAttachment } from "./MultiplyStreamAttachment";
import { MultiplyStreamFile } from "./MultiplyStreamFile";
import { CacheControlHeaderValue } from "../../../../System/Net/Http/Headers/CacheControlHeaderValue";
import { UrlResponse } from "./UrlResponse";
import { Type } from "../../../../System/Type";
export class StreamAttachment {
    public ToString(): string {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public Equals(obj_or_other?: any | MultiplyStreamAttachment | StreamAttachment | MultiplyStreamFile | UrlResponse): boolean {
        return {} as any;
    }
    public <Clone>$(): StreamAttachment | MultiplyStreamAttachment | MultiplyStreamFile | UrlResponse {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(Stream?: Stream, FileName?: string, ContentEncoding?: string) {
    }
    public static op_Inequality(left?: StreamAttachment, right?: StreamAttachment): boolean {
        return {} as any;
    }
    public static op_Equality(left?: StreamAttachment, right?: StreamAttachment): boolean {
        return {} as any;
    }
    public get Stream(): Stream {
        return {} as any;
    }
    public set Stream(value: Stream) {
    }
    public get FileName(): string {
        return {} as any;
    }
    public set FileName(value: string) {
    }
    public get Streams(): Stream[] {
        return {} as any;
    }
    public set Streams(value: Stream[]) {
    }
    public get ContentType(): string {
        return {} as any;
    }
    public set ContentType(value: string) {
    }
    public get ContentDisposition(): string {
        return {} as any;
    }
    public set ContentDisposition(value: string) {
    }
    public get ContentEncoding(): string {
        return {} as any;
    }
    public set ContentEncoding(value: string) {
    }
    public get FileEncoding(): string {
        return {} as any;
    }
    public set FileEncoding(value: string) {
    }
    public get CacheControl(): CacheControlHeaderValue {
        return {} as any;
    }
    public set CacheControl(value: CacheControlHeaderValue) {
    }
}