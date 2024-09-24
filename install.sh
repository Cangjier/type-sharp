# 自动将Releases下最新版本下载
# 1. 下载最新版本
wget --no-cache https://github.com/Cangjier/type-sharp/releases/download/latest/tsc
# 2. 移动到/usr/local/bin
sudo mv tsc /usr/local/bin
# 3. 添加可执行权限
sudo chmod +x /usr/local/bin/tsc
exit