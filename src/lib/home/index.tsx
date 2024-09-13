import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Base64 } from "js-base64"; // Import the Base64 module from the appropriate library

export interface IHomeProps {
}

export interface IHomeRef {

}

export const Home = forwardRef<IHomeRef, IHomeProps>((props, ref) => {
    const repoOwner = 'Cangjier'; // 仓库所有者的用户名  
    const repoName = 'type-sharp'; // 仓库名称  
    const branch = 'main'; // 分支名称，通常是 main 或 master  

    const url = `https://api.github.com/repos/${repoOwner}/${repoName}/readme?ref=${branch}`;
    const [makrdownSource, setMarkdownSource] = useState<string>("# Loading...");
    useEffect(() => {
        let func = async () => {
            try{
                let response = await axios.get(url);
                let downloadUrl = response.data.download_url;
                response = await axios.get(downloadUrl);
                setMarkdownSource(response.data);
            }
            catch(e){
                console.error(e);
                setMarkdownSource("# Error loading README.md");
            }
        }
        func();
    });
    return <Markdown>
        {makrdownSource}
    </Markdown>
})