import { Exception } from "../../Exception";
import { CancellationToken } from "../CancellationToken";
import { Type } from "../../Type";
import { TaskCreationOptions } from "./TaskCreationOptions";
export class TaskCompletionSource {
    public SetException(exception?: Exception): void {
        return {} as any;
    }
    public TrySetException(exception?: Exception): boolean {
        return {} as any;
    }
    public SetResult(): void {
        return {} as any;
    }
    public TrySetResult(): boolean {
        return {} as any;
    }
    public SetCanceled(cancellationToken?: CancellationToken): void {
        return {} as any;
    }
    public TrySetCanceled(cancellationToken?: CancellationToken): boolean {
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
    public constructor(creationOptions_or_state?: TaskCreationOptions | any, creationOptions?: TaskCreationOptions) {
    }
    public get Task(): Promise<void> {
        return {} as any;
    }
}