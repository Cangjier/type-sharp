# TypeSharp
TypeSharp 是一个基于C#开发的TypeScript脚本引擎，可以在TypeScript中调用C#的方法和属性。
``` typescript
import { File } from '../System/IO/File.ts';
import { Path } from '../System/IO/Path.ts';
import { Directory } from '../System/IO/Directory.ts';
import { Console } from '../System/Console.ts';
let main = async () => {
    Console.WriteLine('Hello, TypeSharp!');
    let path = Path.Combine(Directory.GetCurrentDirectory(), 'test.txt');
    await File.WriteAllTextAsync(path, 'Hello, TypeSharp!');
    Console.WriteLine(await File.ReadAllTextAsync(path));
};

await main();
```
# 安装教程
在Linux下可以通过以下脚本进行安装。
``` bash
wget --no-cache -qO- https://raw.githubusercontent.com/Cangjier/type-sharp/main/install.sh | bash && source ~/.bashrc
```
注意的是，TypeSharp基于.Net8进行开发，因此在正式使用前，需要参考 [Linux安装.Net8](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#scripted-install) 。

# 使用教程
## list
```
tsc list
```
该命令将会将仓库中cli中所有目录罗列。
## run
```
tsc run ./main.ts
tsc run create-react-component
```
该命令支持运行本地脚本，网络脚本，以及仓库中cli下的脚本。

# 其他

你可以通过 [TypeSharp](https://github.com/Cangjier/type-sharp) 了解更多信息。
