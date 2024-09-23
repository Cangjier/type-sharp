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
# 使用
wget -qO- https://raw.githubusercontent.com/Cangjier/type-sharp/main/install.sh | bash


你可以通过 [TypeSharp](https://github.com/Cangjier/type-sharp) 了解更多信息。
