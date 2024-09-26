import { args, cmdAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
let port  = args.length > 0 ? args[0] : "8080";
let cmd = `/usr/local/bin tscl run register-service webhook-react-deploy-${port} "/usr/local/bin tscl run webhook-react-deploy ${port}"`;
console.log(cmd);
await cmdAsync(Environment.CurrentDirectory, cmd);