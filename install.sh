# 自动将Releases下最新版本下载

# 1. 检查是否存在git配置的代理
proxy=$(git config --get http.proxy)

# 2. 下载最新版本
if [ -n "$proxy" ]; then
    wget -e "http_proxy=$proxy" --no-cache https://github.com/Cangjier/type-sharp/releases/download/latest/tscl
else
    wget --no-cache https://github.com/Cangjier/type-sharp/releases/download/latest/tscl
fi

# 3. 移动到/usr/local/bin
sudo mv tscl /usr/local/bin

# 4. 添加可执行权限
sudo chmod +x /usr/local/bin/tscl

# 5. 退出
exit
