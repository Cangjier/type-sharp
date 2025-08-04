import { args } from "../.tsc/Context";
import { clearDirectory} from "../.tsc/staticContext";

let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        if (i + 1 < args.length) {
            let value = args[i + 1];
            parameters[key] = value;
            i++;
        }
        else {
            parameters[key] = "true";
        }
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(`parameters: ${parameters}`);

let main = ()=>{
    let toClearDirectory = parameters.i ?? parameters.input ?? "";
    if(toClearDirectory == ""){
        console.log("缺少参数：--input 或 -i, 指定要清理的目录");
        return;
    }
    clearDirectory(toClearDirectory);
};

main();