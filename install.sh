# 自动将Releases下最新版本下载
# 1. 下载最新版本
wget https://github.com/Cangjier/type-sharp/releases/download/1.4.20240924.9/tsc
# 2. 移动到/usr/local/bin
sudo mv tsc /usr/local/bin
# 3. 添加可执行权限
sudo chmod +x /usr/local/bin/tsc
