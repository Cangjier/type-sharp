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
# 使用教程
在Linux下可以通过以下脚本进行安装。
``` bash
wget -qO- https://raw.githubusercontent.com/Cangjier/type-sharp/main/install.sh | bash
```
注意的是，TypeSharp基于.Net8进行开发，因此在正式使用前，需要参考 [Linux安装.Net8](https://learn.microsoft.com/zh-cn/dotnet/core/install/linux-scripted-manual#scripted-install) 。

# 其他

你可以通过 [TypeSharp](https://github.com/Cangjier/type-sharp) 了解更多信息。
