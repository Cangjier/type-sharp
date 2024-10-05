// 将git的apis以命令行进行实现

import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { args } from "../.tsc/context";

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

let help = () => {
    console.log("Usage: tscl run gitapis release <git-url> <tag-name> --files <file1>,<file2> --token <token>");
};

let cmd_release = async () => {
    if (args.length < 4 || parameters.files == undefined || parameters.token == undefined) {
        help();
        return;
    }
    let gitUrl = args[1]; // such as https://github.com/Cangjier/type-sharp.git
    let tagName = args[2];
    let files = parameters.files.split(",");
    let token = parameters.token;
    // 从giturl中提取出owner和repo
    let owner = gitUrl.split("/")[3];
    let repo = gitUrl.split("/")[4].split(".")[0];
    let response = await axios.post(`https://api.github.com/repos/${owner}/${repo}/releases`, {
        tag_name: tagName,
        name: tagName,
        body: tagName,
        draft: false,
        prerelease: false
    },{
        headers: {
            Authorization: `token ${token}`
        }
    });
};

let main = async () => {
    if (args.length < 1) {
        help();
        return;
    }
    let command = args[0];
    if (command == "release") {
        await cmd_release();
    }
    else {
        help();
    }
};

await main();