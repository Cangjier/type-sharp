import { args, cmdAsync } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";

let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(`parameters: ${parameters}`);
let port = parameters.port ?? "8080";
let cmd = `/usr/local/bin/tscl run register-service webhook-${port} "/usr/local/bin/tscl run webhook ${args.join(" ")}"`;
console.log(cmd);
await cmdAsync(Environment.CurrentDirectory, cmd);