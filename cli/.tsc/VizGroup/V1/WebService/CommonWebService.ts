import { ServiceScope } from "../ServiceScope";
import { NoneResponse } from "../../../TidyHPC/Routers/Urls/Responses/NoneResponse";
import { Session } from "../../../TidyHPC/Routers/Urls/Session";
import { Type } from "../../../System/Type";
export class CommonWebService {
    public Response(session?: Session): Promise<NoneResponse> {
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
    public constructor(serviceScope?: ServiceScope) {
    }
    public get ServiceScope(): ServiceScope {
        return {} as any;
    }
}