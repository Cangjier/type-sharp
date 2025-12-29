import { Session } from "../Session";
import { CancellationToken } from "../../../../System/Threading/CancellationToken";
export class IServer {
    public GetNextSession(cancellationToken?: CancellationToken): Promise<Session> {
        return {} as any;
    }
}