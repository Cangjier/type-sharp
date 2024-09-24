import {Server} from '../.tsc/TypeSharp/System/Server'

let main=()=>{
    let server = new Server();
    await server.start();
};

let a:Promise=()=>void;