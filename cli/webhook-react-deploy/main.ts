import { Server } from '../.tsc/TypeSharp/System/Server';
import { Session } from '../.tsc/TidyHPC/Routers/Urls/Session';
import { args } from '../.tsc/context';

let main = async () => {
    let server = new Server();
    server.use("/api/v1/webhook", async (session: Session) => {
        console.log(session.Request.Url);
        console.log(await session.Cache.GetRequstBodyJson());
    });
    await server.start(Number(args[0]));
};

await main();