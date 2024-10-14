# 自动将Releases下最新版本下载
# 1. 检查是否存在git配置的代理
proxy=$(git config --get http.proxy)

# 2. 下载最新版本
if [ -n "$proxy" ]; then
    # 输出日志
    echo "use proxy: $proxy"
    wget -e "https_proxy=$proxy" --no-cache https://github.com/Cangjier/type-sharp/releases/download/latest/tscl
    # wget -e "https_proxy=http://127.0.0.1:7897" --no-cache https://github.com/Cangjier/type-sharp/releases/download/latest/tscl
else
    wget --no-cache https://github.com/Cangjier/type-sharp/releases/download/latest/tscl
fi

# 3. 找到并杀掉所有tscl进程
for pid in $(ps -ef | grep tscl | grep -v grep | awk '{print $2}'); do
    sudo kill -9 $pid
done

# 4. 移动到/usr/local/bin
sudo mv tscl /usr/local/bin

# 5. 添加可执行权限
sudo chmod +x /usr/local/bin/tscl

# 6. 退出
exit
