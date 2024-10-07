import { Server } from '../.tsc/Cangjie/TypeSharp/System/Server';
import { Session } from '../.tsc/TidyHPC/Routers/Urls/Session';
import { args, cmd, cmdAsync, copyDirectory, deleteDirectory, execAsync } from '../.tsc/context';
import { Path } from '../.tsc/System/IO/Path';
import { File } from '../.tsc/System/IO/File';
import { Directory } from '../.tsc/System/IO/Directory';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { Regex } from '../.tsc/System/Text/RegularExpressions/Regex';
import { Environment } from '../.tsc/System/Environment';
import { Guid } from '../.tsc/System/Guid';
import { Xml } from '../.tsc/TidyHPC/LiteXml/Xml';

let publishCsproj = async (csprojPath: string) => {
    // 判断csproj所在目录下Properties/PublishProfiles/是否存在pubxml文件
    // 如果存在，则使用dotnet publish --publish-profile xxx
    let currentDirectory = Path.GetDirectoryName(csprojPath);
    let binDirectory = Path.Combine(currentDirectory, "bin");
    if (Directory.Exists(binDirectory) == false) {
        Directory.CreateDirectory(binDirectory);
    }
    let publishProfilesDirectory = Path.Combine(currentDirectory, "Properties", "PublishProfiles");
    let pubxmlFiles = Directory.Exists(publishProfilesDirectory) ?
        Directory.GetFiles(publishProfilesDirectory, "*.pubxml") :
        [];
    if (pubxmlFiles.length == 0) {
        let cmd = `dotnet publish -c Release -f net8.0`;
        console.log(cmd);
        if (await cmdAsync(currentDirectory, cmd) != 0) {
            console.log(`dotnet publish failed`);
            return false;
        }
    }
    else {
        for (let pubXmlFile of pubxmlFiles) {
            // 将pubXmlFile中的PublishDir设置为/bin/{Guid}
            let publishDir = Path.Combine(currentDirectory, "bin", Guid.NewGuid().ToString());
            await execAsync(Environment.ProcessPath, "run", "vs-pubxml", pubXmlFile, "PublishDir", publishDir);
            let cmd = `dotnet publish --publish-profile ${Path.GetFileNameWithoutExtension(pubXmlFile)}`;
            console.log(cmd);
            if (await cmdAsync(currentDirectory, cmd) != 0) {
                console.log(`dotnet publish failed`);
                return false;
            }
        }
    }
    return true;
};

let help = () => {
    console.log("Usage: vs-publish <csproj-file>");
    console.log("Example: vs-publish my.csproj");
};

let main = async () => {
    if (args.length < 1) {
        help();
        return;
    }
    let csprojPath = args[0];
    if (!File.Exists(csprojPath)) {
        console.log(`${csprojPath} not found`);
        return;
    }
    if (await publishCsproj(csprojPath) == false) {
        console.log(`publish failed`);
        return;
    }
    console.log(`publish succeeded`);
};

await main();