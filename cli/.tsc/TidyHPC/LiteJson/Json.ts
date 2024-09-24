import { JsonValueKind } from "../../System/Text/Json/JsonValueKind";
import { Stream } from "../../System/IO/Stream";
import { JsonNode } from "../../System/Text/Json/Nodes/JsonNode";
import { JsonElement } from "../../System/Text/Json/JsonElement";
import { SByte } from "../../System/SByte";
import { Int16 } from "../../System/Int16";
import { UInt16 } from "../../System/UInt16";
import { DateTime } from "../../System/DateTime";
import { TimeSpan } from "../../System/TimeSpan";
import { Guid } from "../../System/Guid";
import { Type } from "../../System/Type";
import { ObjectWrapper } from "./ObjectWrapper";
import { ArrayWrapper } from "./ArrayWrapper";
export class Json {
    public get Node(): any {
        return {} as any;
    }
    public static get Undefined(): any {
        return {} as any;
    }
    public get Count(): number {
        return {} as any;
    }
    public get Item(): any {
        return {} as any;
    }
    public set Item(index: number, value: any) {
    }
    public get IsFixedSize(): boolean {
        return {} as any;
    }
    public get IsReadOnly(): boolean {
        return {} as any;
    }
    public get IsSynchronized(): boolean {
        return {} as any;
    }
    public get SyncRoot(): any {
        return {} as any;
    }
    public get Item(): any {
        return {} as any;
    }
    public set Item(key: any, value: any) {
    }
    public get IsObject(): boolean {
        return {} as any;
    }
    public get AsObject(): ObjectWrapper {
        return {} as any;
    }
    public get IsArray(): boolean {
        return {} as any;
    }
    public get AsArray(): ArrayWrapper {
        return {} as any;
    }
    public get IsString(): boolean {
        return {} as any;
    }
    public get AsString(): string {
        return {} as any;
    }
    public get IsNumber(): boolean {
        return {} as any;
    }
    public get AsNumber(): number {
        return {} as any;
    }
    public get IsByte(): boolean {
        return {} as any;
    }
    public get AsByte(): number {
        return {} as any;
    }
    public get IsInt32(): boolean {
        return {} as any;
    }
    public get AsInt32(): number {
        return {} as any;
    }
    public get ToInt32(): number {
        return {} as any;
    }
    public get IsInt64(): boolean {
        return {} as any;
    }
    public get AsInt64(): number {
        return {} as any;
    }
    public get IsFloat(): boolean {
        return {} as any;
    }
    public get AsFloat(): number {
        return {} as any;
    }
    public get IsDouble(): boolean {
        return {} as any;
    }
    public get AsDouble(): number {
        return {} as any;
    }
    public get IsBoolean(): boolean {
        return {} as any;
    }
    public get AsBoolean(): boolean {
        return {} as any;
    }
    public get IsTrue(): boolean {
        return {} as any;
    }
    public get IsFalse(): boolean {
        return {} as any;
    }
    public get IsGuid(): boolean {
        return {} as any;
    }
    public get AsGuid(): Guid {
        return {} as any;
    }
    public get IsNull(): boolean {
        return {} as any;
    }
    public get IsUndefined(): boolean {
        return {} as any;
    }
    public get Keys(): string[] {
        return {} as any;
    }
    public get Values(): any[] {
        return {} as any;
    }
    public get Item(): any {
        return {} as any;
    }
    public set Item(key: string, value: any) {
    }
    public get Item(): any {
        return {} as any;
    }
    public set Item(index: any, value: any) {
    }
    public Null: any;
    public GetValueKind(): JsonValueKind {
        return {} as any;
    }
    public Clone(): any {
        return {} as any;
    }
    public Clear(): void {
        return {} as any;
    }
    public ToString(indented?: boolean): string {
        return {} as any;
    }
    public Save(path_or_stream?: string | Stream, indented?: boolean): void {
        return {} as any;
    }
    public WriteTo(stream?: Stream): void {
        return {} as any;
    }
    public AssertObject(): void {
        return {} as any;
    }
    public AssertArray(): void {
        return {} as any;
    }
    public Dispose(): void {
        return {} as any;
    }
    public Equals(other?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public Get(index_or_key?: number | string, defaultValue?: any): any {
        return {} as any;
    }
    public GetOrCreateObject(index_or_key?: number | string): any {
        return {} as any;
    }
    public GetOrCreateArray(index_or_key?: number | string): any {
        return {} as any;
    }
    public Set(index_or_key?: number | string, value?: any | JsonNode | string | number | boolean | Guid | DateTime | TimeSpan): void | any {
        return {} as any;
    }
    public AddObject(): any {
        return {} as any;
    }
    public AddArray(): any {
        return {} as any;
    }
    public Add(item_or_key?: number | string | boolean | any, value?: any): void {
        return {} as any;
    }
    public AddRange(array?: any): void {
        return {} as any;
    }
    public Insert(index?: number, value?: any): void {
        return {} as any;
    }
    public Contains(value_or_key?: any): boolean {
        return {} as any;
    }
    public IndexOf(value?: any): number {
        return {} as any;
    }
    public LastIndexOf(value?: any): number {
        return {} as any;
    }
    public Remove(key?: any): void {
        return {} as any;
    }
    public CopyTo(array?: any[], index?: number): void {
        return {} as any;
    }
    public Is(): boolean {
        return {} as any;
    }
    public As(): T {
        return {} as any;
    }
    public RemoveKey(key?: string): void {
        return {} as any;
    }
    public SetByPath(path?: JsonIndex[], value?: any): void {
        return {} as any;
    }
    public Invoke(objects?: any[]): any {
        return {} as any;
    }
    public GetGuid(key?: string, defaultValue?: Guid): Guid {
        return {} as any;
    }
    public GetDateTime(key?: string, defaultValue?: DateTime): DateTime {
        return {} as any;
    }
    public GetTimeSpan(key?: string, defaultValue?: TimeSpan): TimeSpan {
        return {} as any;
    }
    public Read(key?: string, defaultValue?: string | number | boolean | Guid | TimeSpan | DateTime): string | number | boolean | Guid | TimeSpan | DateTime {
        return {} as any;
    }
    public ContainsKey(key?: string): boolean {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(node?: any) {
    }
    public static NewObject(): any {
        return {} as any;
    }
    public static NewArray(): any {
        return {} as any;
    }
    public static Parse(value_or_stream_or_bytes?: string | Stream | number[]): any {
        return {} as any;
    }
    public static Load(path?: string): any {
        return {} as any;
    }
    public static Validate(json_or_stream?: string | Stream): boolean {
        return {} as any;
    }
    public static op_Implicit(value?: string | JsonNode | JsonElement | number | SByte | Int16 | UInt16 | boolean | DateTime | TimeSpan | Guid): any {
        return {} as any;
    }
    public static op_ImplicitFrom(value?: any): any {
        return {} as any;
    }
    public static op_ImplicitTo(value?: any, toType?: Type): any {
        return {} as any;
    }
    public static op_GetMember(self?: any, key?: string): any {
        return {} as any;
    }
    public static op_SetMember(self?: any, key?: string, value?: any): any {
        return {} as any;
    }
    public static op_Invoke(self?: any, name?: string, objects?: any[]): any {
        return {} as any;
    }
    public static op_Increment(json?: any): any {
        return {} as any;
    }
    public static op_Decrement(json?: any): any {
        return {} as any;
    }
    public static op_Equality(left?: any, right?: any): boolean {
        return {} as any;
    }
    public static op_Inequality(left?: any, right?: any): boolean {
        return {} as any;
    }
    public static op_Addition(left?: any, right?: any): any {
        return {} as any;
    }
    public static op_Subtraction(left?: any, right?: any): any {
        return {} as any;
    }
    public static op_Multiply(left?: any, right?: any): any {
        return {} as any;
    }
    public static op_Division(left?: any, right?: any): any {
        return {} as any;
    }
    public static op_GreaterThan(left?: any, right?: any): boolean {
        return {} as any;
    }
    public static op_LessThan(left?: any, right?: any): boolean {
        return {} as any;
    }
    public static op_GreaterThanOrEqual(left?: any, right?: any): boolean {
        return {} as any;
    }
    public static op_LessThanOrEqual(left?: any, right?: any): boolean {
        return {} as any;
    }
    public static op_Modulus(left?: any, right?: any): any {
        return {} as any;
    }
}