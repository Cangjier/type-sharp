import { Server } from '../.tsc/Cangjie/TypeSharp/System/Server';
import { Session } from '../.tsc/TidyHPC/Routers/Urls/Session';
import { args, cmd, cmdAsync, copyDirectory, deleteDirectory } from '../.tsc/context';
import { Path } from '../.tsc/System/IO/Path';
import { File } from '../.tsc/System/IO/File';
import { Directory } from '../.tsc/System/IO/Directory';
import { UTF8Encoding } from '../.tsc/System/Text/UTF8Encoding';
import { Json } from '../.tsc/TidyHPC/LiteJson/Json';
import { Regex } from '../.tsc/System/Text/RegularExpressions/Regex';
import { Environment } from '../.tsc/System/Environment';
import { Guid } from '../.tsc/System/Guid';
import { Xml } from '../.tsc/TidyHPC/LiteXml/Xml';

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
    console.log("Usage: vs-pubxml <pubxml-file> <key> <value>");
    console.log("Example: vs-pubxml my.pubxml Configuration Release");
};

let main = async () => {
    if (args.length < 3) {
        help();
        return;
    }
    let pubXmlFile = args[0];
    let key = args[1];
    let value = args[2];
    let xml = Xml.Load(pubXmlFile);
    let project = xml.Root;
    let propertyGroup = project.GetOrCreateElementByName("PropertyGroup");
    let property = propertyGroup.GetOrCreateElementByName(key);
    property.InnerText = value;
    xml.Save(pubXmlFile);
};

await main();
