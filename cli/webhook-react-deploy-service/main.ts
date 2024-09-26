import { args, cmdAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
let port = args.length > 0 ? args[0] : "8080";
let secret = args.length > 1 ? args[1] : "";
let cmd = `/usr/local/bin/tscl run register-service webhook-react-deploy-${port} "/usr/local/bin/tscl run webhook-react-deploy ${port} ${secret}"`;
console.log(cmd);
await cmdAsync(Environment.CurrentDirectory, cmd);