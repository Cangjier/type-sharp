import { Database } from "../Database";
export class DBType {
    public GetHashCode(db?: Database): Promise<number> {
        return {} as any;
    }
    public Equals(db?: Database, other?: DBType): Promise<boolean> {
        return {} as any;
    }
    public Read(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public Write(buffer?: number[], offset?: number): number {
        return {} as any;
    }
    public static GetSize(): number {
        return {} as any;
    }
}