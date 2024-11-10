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

echo "Stop all tscl services"
# 停止所有ExecStart带有tscl的服务
systemctl list-units --type=service | grep 'tscl run' | awk '{print $1}' | xargs -r systemctl stop

# 延迟3秒
sleep 3

echo "Kill all tscl processes"
# 找到并杀掉所有tscl进程
for pid in $(ps -ef | grep tscl | grep -v grep | awk '{print $2}'); do
    sudo kill -9 $pid
done

# 延迟1秒
sleep 1

# 4. 移动到/home/ubuntu/.tscl/bin
sudo mv tscl /home/ubuntu/.tscl/bin

# 5. 添加可执行权限
sudo chmod +x /home/ubuntu/.tscl/bin/tscl

# 启动所有ExecStart带有tscl的服务
systemctl list-units --type=service | grep 'tscl run' | awk '{print $1}' | xargs -r systemctl start

# 6. 在.bashrc中添加环境变量，如果不存在则添加
if [ -z "$(cat ~/.bashrc | grep 'export PATH=$PATH:/home/ubuntu/.tscl/bin')" ]; then
    echo 'export PATH=$PATH:/home/ubuntu/.tscl/bin' >>~/.bashrc
fi

# 7. 退出
exit
