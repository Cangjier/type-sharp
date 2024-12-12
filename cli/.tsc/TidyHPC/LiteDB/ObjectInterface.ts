import { FieldType } from "./Metas/FieldType";
import { FieldMapType } from "./Metas/FieldMapType";
import { Guid } from "../../System/Guid";
import { Field } from "./Metas/Field";
import { Type } from "../../System/Type";
export class ObjectInterface {
    public AddMasterField(name?: string): void {
        return {} as any;
    }
    public AddIndexField(name?: string, type?: FieldType, arrayLength?: number): void {
        return {} as any;
    }
    public AddField(name?: string, type?: FieldType, arrayLength_or_mapType?: number | FieldMapType, arrayLength?: number): void {
        return {} as any;
    }
    public AddArrayField(name?: string, type?: FieldType, arrayLength?: number): void {
        return {} as any;
    }
    public Initialize(onSelf?: ((arg0?:ObjectInterface)=>void)): ObjectInterface {
        return {} as any;
    }
    public GetSize(): number {
        return {} as any;
    }
    public Validate(record?: any): void {
        return {} as any;
    }
    public GetMasterByJsonDocument(record?: any): Guid {
        return {} as any;
    }
    public SerializeToJson(self?: any): void {
        return {} as any;
    }
    public DeserializeFromJson(self?: any): void {
        return {} as any;
    }
    public ToString(indent?: boolean): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public constructor() {
    }
    public static CheckJsonElementIsMatchFieldType(field?: Field, property?: any, invalidMessages?: string[]): boolean {
        return {} as any;
    }
    public get FullName(): string {
        return {} as any;
    }
    public set FullName(value: string) {
    }
    public get Fields(): Field[] {
        return {} as any;
    }
    public static get MapFieldTypeToJsonValueKinds(): { [key: FieldType]: JsonValueKind[] } {
        return {} as any;
    }
}