import { Path } from "../.tsc/System/IO/Path";
import { File } from "../.tsc/System/IO/File";
import { UTF8Encoding } from "../.tsc/System/Text/UTF8Encoding";
import { Directory } from "../.tsc/System/IO/Directory";
import { args } from "../.tsc/Context";

let parameters = {} as { [key: string]: string };
for (let i = 0; i < args.length; i++) {
    let arg = args[i];
    if (arg.startsWith("--")) {
        let key = arg.substring(2);
        if (i + 1 < args.length) {
            let value = args[i + 1];
            parameters[key] = value;
            i++;
        }
        else {
            parameters[key] = "true";
        }
    }
    else if (arg.startsWith("-")) {
        let key = arg.substring(1);
        let value = args[i + 1];
        parameters[key] = value;
        i++;
    }
}
console.log(`parameters: ${parameters}`);

const utf8 = new UTF8Encoding(false);

const injectWindowHtml = (setupDirectory: string) => {
    const windowHtmlPath = `${setupDirectory}/resources/window.html`;
    const windowHtmlContent = File.ReadAllText(windowHtmlPath, utf8);
    let headIndex = windowHtmlContent.indexOf("<head>") + 6;
    let injectContent = `<style>
body>div[role="button"] {
    visibility: hidden;
}
</style>`;
    let newWindowHtml = windowHtmlContent.slice(0, headIndex) + injectContent + windowHtmlContent.slice(headIndex);
    File.WriteAllText(windowHtmlPath, newWindowHtml, utf8);
};

const injectLicenseJS = (setupDirectory: string) => {
    const licenseDirectory = `${setupDirectory}/resources/page-dist/static/js`;
    const licenseFilePath = Directory.GetFiles(licenseDirectory).find(x => x.includes("LicenseIndex."));
    if (licenseFilePath == undefined) {
        throw `license file not found: ${licenseDirectory}`;
    }
    let licenseContent = File.ReadAllText(licenseFilePath, utf8);
    licenseContent = licenseContent.replace(`hasActivated="true"==e.hasActivated`, `hasActivated="true"=="true"`);
    File.WriteAllText(licenseFilePath, licenseContent, utf8);
};

const injectTyporaJS = (setupDirectory: string) => {
    const typoraDirectory = `${setupDirectory}/resources/page-dist/static/js`;
    const typoraFilePath = Directory.GetFiles(typoraDirectory).find(x => {
        let fileContent = File.ReadAllText(x, utf8);
        return fileContent.includes("/*! For license information");
    });
    if (typoraFilePath == undefined) {
        throw `typora file not found: ${typoraDirectory}`;
    }
    let typoraContentLines = [...File.ReadAllText(typoraFilePath, utf8).replace("\r", "").split("\n")];
    // insert line to index 1
    typoraContentLines.splice(1, 0, `
// 创建一个新的 div 元素
var div = document.createElement('div');
 
// 给 div 添加一个唯一的 ID
div.id = 'myOverlay';
 
// 设置 div 的样式
div.style.position = 'fixed';
div.style.top = '0';
div.style.left = '0';
div.style.width = '100vw'; // 使用 100% 宽度
div.style.height = '100vh'; // 使用 100% 高度
div.style.backgroundColor = 'rgb(54,59,64)'; // Night主题背景色
div.style.zIndex = '9999'; // 确保 div 在最上层
 
// 将 div 添加到 body 中
document.body.appendChild(div);
 
//window.resizeTo(1, 1); // 将窗口缩小大小，可要，也可以不要
 
// 设置定时器，在 360 毫秒后删除 div ，并关闭页面
setTimeout(function () {
    var overlay = document.getElementById('myOverlay');
    if (overlay) {
        overlay.remove(); // 删除 div
    }
 
    // 点击关闭按钮，关闭页面
    //document.querySelector('.text-btn').click(); //未激活关闭按钮
    document.querySelector('.default-btn.secondary-btn').click(); //激活后关闭按钮
 
}, 360); // 360 毫秒后关闭弹窗
`);
    File.WriteAllText(typoraFilePath, typoraContentLines.join("\r\n"), utf8);
};


const main = async (setupDirectory: string) => {
    injectWindowHtml(setupDirectory);
    injectLicenseJS(setupDirectory);
    injectTyporaJS(setupDirectory);
};


await main(parameters["-i"] ?? "./");