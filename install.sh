#!/bin/bash

# 自动下载Releases下的最新版本并更新服务

# 1. 检查是否存在git配置的代理
proxy=$(git config --get http.proxy)

# 2. 下载最新版本
download_url="https://github.com/Cangjier/type-sharp/releases/download/latest/tscl"
if [ -n "$proxy" ]; then
    echo "Using proxy: $proxy"
    wget -e "https_proxy=$proxy" --no-cache "$download_url"
else
    wget --no-cache "$download_url"
fi

echo "Stop all tscl services"

# 停止所有包含 'tscl' 的服务
for service in $(systemctl list-units --type=service --no-legend --all | awk '{print $1}'); do
    # 检查该服务的ExecStart是否包含'tscl'
    if systemctl show "$service" -p ExecStart | grep -q 'tscl'; then
        sudo systemctl stop "$service"
    fi
done

# 延迟3秒
sleep 3

echo "Kill all tscl processes"
# 找到并杀掉所有tscl进程
for pid in $(pgrep -f tscl); do
    sudo kill -9 "$pid"
done

# 延迟1秒
sleep 1

# 4. 移动到/home/ubuntu/.tscl/bin
sudo mv tscl /home/ubuntu/.tscl/bin

# 5. 添加可执行权限
sudo chmod +x /home/ubuntu/.tscl/bin/tscl

echo "Start all tscl services"
# 启动所有包含 'tscl' 的服务
for service in $(systemctl list-units --type=service --no-legend --all | awk '{print $1}'); do
    if systemctl show "$service" -p ExecStart | grep -q 'tscl'; then
        sudo systemctl start "$service"
    fi
done

# 6. 在.bashrc中添加环境变量，如果不存在则添加
if ! grep -q 'export PATH=$PATH:/home/ubuntu/.tscl/bin' ~/.bashrc; then
    echo 'export PATH=$PATH:/home/ubuntu/.tscl/bin' >>~/.bashrc
fi

# 7. 退出
exit
