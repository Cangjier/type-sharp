import { Type } from "../../../System/Type";
export class AuthorityGroup {
    public Mix(authorityGroup?: AuthorityGroup): void {
        return {} as any;
    }
    public Equals(obj?: any): boolean {
        return {} as any;
    }
    public GetHashCode(): number {
        return {} as any;
    }
    public ToString(): string {
        return {} as any;
    }
    public GetType(): Type {
        return {} as any;
    }
    public constructor(authorityBytes?: number[]) {
    }
    public static Parse(authorityBase64?: string): AuthorityGroup {
        return {} as any;
    }
    public static Generate(indices_or_onByte?: number[] | ((arg0?:number)=>number), values?: number[]): AuthorityGroup {
        return {} as any;
    }
    public static op_Implicit(authorityBytes_or_authorityGroup?: number[] | AuthorityGroup): AuthorityGroup | number[] {
        return {} as any;
    }
    public static op_Equality(left?: AuthorityGroup, right?: AuthorityGroup): boolean {
        return {} as any;
    }
    public static op_Inequality(left?: AuthorityGroup, right?: AuthorityGroup): boolean {
        return {} as any;
    }
    public static op_GreaterThan(left?: AuthorityGroup, right?: AuthorityGroup): boolean {
        return {} as any;
    }
    public static op_LessThan(left?: AuthorityGroup, right?: AuthorityGroup): boolean {
        return {} as any;
    }
    public static op_GreaterThanOrEqual(left?: AuthorityGroup, right?: AuthorityGroup): boolean {
        return {} as any;
    }
    public static op_LessThanOrEqual(left?: AuthorityGroup, right?: AuthorityGroup): boolean {
        return {} as any;
    }
    public static op_BitwiseOr(left?: AuthorityGroup, right?: AuthorityGroup): AuthorityGroup {
        return {} as any;
    }
    public static op_BitwiseAnd(left?: AuthorityGroup, right?: AuthorityGroup): AuthorityGroup {
        return {} as any;
    }
    public static MaxAuthorityCount: number;
    public get AuthorityBytes(): number[] {
        return {} as any;
    }
    public get Base64(): string {
        return {} as any;
    }
    public static get Empty(): AuthorityGroup {
        return {} as any;
    }
    public static get Administrator(): AuthorityGroup {
        return {} as any;
    }
}