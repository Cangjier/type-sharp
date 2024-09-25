# webhook-deploy
该命令行是在服务器上启动webhook服务，当git push时，自动拉取仓库，进行编译，编译完成后自动部署。
# 使用教程
```
tsc run webhook-react-deploy <port>
```
- port: 监听的端口

目前支持react项目的自动化编译和部署，当项目存在package.json并且支持`npm run build`，则会自动克隆并安装依赖包，然后执行构建。

如果构建发生错误，可以直接查看代码，进行确认。


