# webhook
该命令行工具用于创建一个 webhook 服务，用于接收来自 github 的 webhook 事件。目前支持以下功能：
- 接收push事件
  - 自动 git clone 代码
  - 自动打上 `git tag`，格式强制为 `v1.0.0`，新版本号为 `git tag` 的增量版本号
  - 如果为 node js 前端项目（判断依据是：存在package.json并且存在scripts.build字段），则自动执行 npm install && npm run build
    - 编译完成后，自动拷贝到部署目录，可以通过 http://host/项目名 访问
  - 如果为 dotnet 项目（判断依据是：存在 .csproj 文件），则自动执行 dotnet publish，并支持pubxml文件
    - 如果 `.csproj` 中存在 `GeneratePackageOnBuild` 以及 `Version` 字段，则自动执行 `dotnet pack`，并将生成的 nuget 包上传到 nuget 服务器
      - nuget包版本号与`git tag`保持一致
    - 如果存在 `.gitrelease.json` 文件，编译完成后，自动将指定文件上传至 `git release` 上
