import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import Markdown from "react-markdown";

export interface IHomeProps {
}

export interface IHomeRef {

}

export const Home = forwardRef<IHomeRef, IHomeProps>((props, ref) => {
    const repoOwner = 'Cangjier'; // 仓库所有者的用户名  
    const repoName = 'type-sharp'; // 仓库名称  
    const branch = 'main'; // 分支名称，通常是 main 或 master  

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/readme?ref=${branch}`;
    const [makrdownSource, setMarkdownSource] = useState<string>(`# TypeSharp
TypeSharp 是一个基于C#开发的TypeScript脚本引擎，可以在TypeScript中调用C#的方法和属性。
\`\`\` typescript
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
\`\`\`

你可以通过 [TypeSharp](https://github.com/Cangjier/type-sharp) 了解更多信息。
`);
    useEffect(() => {
        let func = async () => {
            try{
                let response = await axios.get(url);
                let downloadUrl = response.data.download_url;
                response = await axios.get(downloadUrl);
                setMarkdownSource(response.data);
            }
            catch{
            }
        }
        func();
    });
    return <Markdown>
        {makrdownSource}
    </Markdown>
})