// 将git的apis以命令行进行实现

import { axios } from "../.tsc/Cangjie/TypeSharp/System/axios";
import { args } from "../.tsc/context";
import { File } from "../.tsc/System/IO/File";
import { Path } from "../.tsc/System/IO/Path";

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

let getDefaultBranch = async (gitUrl: string, token: string) => {
    let owner = gitUrl.split("/")[3];
    let repo = gitUrl.split("/")[4].split(".")[0];
    let response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "tscl"
        }
    });
    return response.data.default_branch;
};

let findExistingRelease = async (gitUrl: string, tagName: string, token: string) => {
    let owner = gitUrl.split("/")[3];
    let repo = gitUrl.split("/")[4].split(".")[0];
    let response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases`, {
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "tscl"
        }
    });

    // 遍历所有release，找到和tagName匹配的release
    for (let release of response.data) {
        if (release.tag_name == tagName) {
            return release.id; // 返回存在的release的ID
        }
    }
    return null; // 如果找不到，返回null
};

// 获取release的所有assets
let getReleaseAssets = async (gitUrl: string, releaseId: number, token: string) => {
    let owner = gitUrl.split("/")[3];
    let repo = gitUrl.split("/")[4].split(".")[0];
    let response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/releases/${releaseId}/assets`, {
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "tscl"
        }
    });
    return response.data; // 返回release的所有assets
};

// 删除已有的文件（asset）
let deleteAsset = async (gitUrl: string, assetId: string, token: string) => {
    let owner = gitUrl.split("/")[3];
    let repo = gitUrl.split("/")[4].split(".")[0];
    let response = await axios.delete(`https://api.github.com/repos/${owner}/${repo}/releases/assets/${assetId}`, {
        responseType:'text',
        headers: {
            Authorization: `token ${token}`,
            "User-Agent": "tscl"
        }
    });
    console.log(response.data);
    console.log(`Deleted asset with ID: ${assetId}`);
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
    // 获取或创建release
    let owner = gitUrl.split("/")[3];
    let repo = gitUrl.split("/")[4].split(".")[0];
    let releaseId = await findExistingRelease(gitUrl, tagName, token);
    if (releaseId == null) {
        // 如果release不存在，创建新的release
        let response = await axios.post(`https://api.github.com/repos/${owner}/${repo}/releases`, {
            tag_name: tagName,
            target_commitish: await getDefaultBranch(gitUrl, token),
            name: tagName,
            body: tagName,
            draft: false,
            prerelease: false
        }, {
            headers: {
                Authorization: `token ${token}`,
                "User-Agent": "tscl"
            }
        });
        releaseId = response.data.id; // 获取新创建的release的ID
    } else {
        console.log(`Release with tag ${tagName} already exists, reusing release ID ${releaseId}`);
    }
    // 获取已有的assets并检查是否有重复的文件名
    let existingAssets = await getReleaseAssets(gitUrl, releaseId, token);
    for (let file of files) {
        let fileName = Path.GetFileName(file);
        let existingAsset = existingAssets.find((asset: any) => asset.name == fileName);

        // 如果有同名的文件，则删除它
        if (existingAsset) {
            console.log(`File ${fileName} already exists in the release, ${existingAsset}, deleting...`);
            await deleteAsset(gitUrl, existingAsset.id, token);
        }

        // 上传文件到release
        let fileResponse = await axios.post(`https://uploads.github.com/repos/${owner}/${repo}/releases/${releaseId}/assets?name=${fileName}`, await File.ReadAllBytesAsync(file), {
            headers: {
                Authorization: `token ${token}`,
                "User-Agent": "tscl",
                "Content-Type": "application/octet-stream"
            }
        });
        console.log(fileResponse.data);
    }
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