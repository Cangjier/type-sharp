import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { File } from "../.tsc/System/IO/File";
import { Console } from "../.tsc/System/Console";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { args, cmdAsync, script_path } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";
let main = async () => {
    let utf8 = new UTF8Encoding(false);
    let name = args[0];
    let execStart = args[1];
    let description = args.length > 2 ? args[2] : "";
    let script_directory = Path.GetDirectoryName(script_path);
    let systemdPath = "/etc/systemd/system";
    let serviceFileDestination = Path.Combine(systemdPath, `${name}.service`);
    let serviceFilePath = Path.Combine(Path.GetTempPath(), `${name}.service`);
    // 第一步，构建服务文件
    let template = await File.ReadAllTextAsync(Path.Combine(script_directory, "template.service"), utf8);
    let serviceFileContent = template
        .replace("<Description>", description)
        .replace("<ExecStart>", execStart);
    await File.WriteAllTextAsync(serviceFilePath, serviceFileContent, utf8);
    // 将服务拷贝到 /etc/systemd/system
    File.Copy(serviceFilePath, serviceFileDestination, true);
    // 刷新服务配置
    await cmdAsync(script_directory, "sudo systemctl daemon-reload");
    // 服务开机启动
    await cmdAsync(script_directory, `sudo systemctl enable ${name}.service`);
    // 启动服务
    await cmdAsync(script_directory, `sudo systemctl start ${name}.service`);
    // 打印服务状态
    await cmdAsync(script_directory, `sudo systemctl status ${name}.service`);
    Console.WriteLine("服务启动成功！");
};

await main();