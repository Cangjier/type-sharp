import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { File } from "../.tsc/System/IO/File";
import { Console } from "../.tsc/System/Console";
import { Directory } from "../.tsc/System/IO/Directory";
import { Path } from "../.tsc/System/IO/Path";
import { args, cmdAsync, script_path } from "../.tsc/context";
import { Environment } from "../.tsc/System/Environment";

let main = async () => {
    if (args.length < 2) {
        console.log("Usage: tscl run service <cli-name> ...");
        return;
    }

    let utf8 = new UTF8Encoding(false);
    let cliName = args[0];
    let serviceName = cliName;
    let execStart = args.join(" ");
    let description = cliName;
    let script_directory = Path.GetDirectoryName(script_path);
    let systemdPath = "/etc/systemd/system";
    let serviceFilePath = Path.Combine(Path.GetTempPath(), `${serviceName}.service`);
    // 排查是否服务 {name} 服务是否已启动，如果启动则停止
    let detectScript = `SERVICE="${serviceName}.service"
# 检查服务状态
if systemctl is-active --quiet "$SERVICE"; then
    echo "$SERVICE is starting. Stopping it now..."
    systemctl stop "$SERVICE"
    echo "$SERVICE has been stopped."
else
    echo "$SERVICE is not starting."
fi`;
    let detectScriptPath = Path.Combine(Path.GetTempPath(), `${serviceName}-detect.sh`);
    await File.WriteAllTextAsync(detectScriptPath, detectScript, utf8);
    await cmdAsync(script_directory, `sudo chmod +x ${detectScriptPath}`);
    console.log(`正在检查服务 ${serviceName} 是否已启动...`);
    console.log(`sudo bash ${detectScriptPath}`)
    await cmdAsync(script_directory, `sudo bash ${detectScriptPath}`);
    // File.Delete(detectScriptPath);
    // 构建服务文件
    let template = await File.ReadAllTextAsync(Path.Combine(script_directory, "template.service"), utf8);
    // 将env输出至tmp文件
    await cmdAsync(script_directory, `sudo env > ${serviceFilePath}.env`);
    let serviceFileContent = template
        .replace("<Description>", description)
        .replace("<EnvironmentFile>", `${serviceFilePath}.env`)
        .replace("<ExecStart>", execStart);
    await File.WriteAllTextAsync(serviceFilePath, serviceFileContent, utf8);
    // 将服务拷贝到 /etc/systemd/system
    await cmdAsync(script_directory, `sudo mv ${serviceFilePath} ${systemdPath}`);
    // 刷新服务配置
    await cmdAsync(script_directory, "sudo systemctl daemon-reload");
    // 服务开机启动
    await cmdAsync(script_directory, `sudo systemctl enable ${serviceName}.service`);
    // 启动服务
    await cmdAsync(script_directory, `sudo systemctl start ${serviceName}.service`);
    Console.WriteLine("服务启动成功！");
};

let loggerPath = Path.Combine(Path.GetTempPath(), "register-service.log");
try {
    await main();
}
catch (e) {
    await File.WriteAllTextAsync(loggerPath, e.ToString(), new UTF8Encoding(false));
    throw e;
}