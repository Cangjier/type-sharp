#!/bin/bash

# 自动下载Releases下的最新版本并更新服务

# 创建临时目录
mkdir -p ${HOME}/tmp

# 检查是否存在git配置的代理
proxy=$(git config --get http.proxy)

# 下载最新版本到 ${HOME}/tmp
download_url="https://github.com/Cangjier/type-sharp/releases/download/latest/tscl"
download_path="${HOME}/tmp/tscl"
if [ -n "$proxy" ]; then
    echo "Using proxy: $proxy"
    wget -e "https_proxy=$proxy" --no-cache -O "$download_path" "$download_url"
else
    wget --no-cache -O "$download_path" "$download_url"
fi

echo "Stop all tscl services"

# 停止所有包含 'tscl' 的服务
for service in $(systemctl list-units --type=service --no-legend --plain | awk '{print $1}'); do
    # 检查该服务的ExecStart是否包含'tscl'
    if systemctl show "$service" -p ExecStart | grep -q 'tscl'; then
        sudo systemctl stop "$service"
        echo "Stopped service: $service"
    fi
done

# 延迟3秒
sleep 3

echo "Checking for running tscl processes..."

# 检查是否有tscl进程在运行
if pgrep -f tscl > /dev/null; then
    echo "Found running tscl processes. Killing them..."
    for pid in $(pgrep -f tscl); do
        sudo kill -9 "$pid"
        echo "Killed process with PID: $pid"
    done
else
    echo "No running tscl processes found."
fi

# 延迟1秒
sleep 1

# 创建目录 ${HOME}/.tscl/bin
echo "Creating ${HOME}/.tscl/bin"
mkdir -p ${HOME}/.tscl
mkdir -p ${HOME}/.tscl/bin
# 移动下载的文件到 ${HOME}/.tscl/bin
echo "Moving downloaded tscl to ${HOME}/.tscl/bin"
sudo mv "$download_path" ${HOME}/.tscl/bin

# 添加可执行权限
sudo chmod +x ${HOME}/.tscl/bin/tscl

echo "Start all tscl services"
# 启动所有包含 'tscl' 的服务
for service in $(systemctl list-units --type=service --no-legend --plain | awk '{print $1}'); do
    if systemctl show "$service" -p ExecStart | grep -q 'tscl'; then
        sudo systemctl start "$service"
        echo "Started service: $service"
    fi
done

# 在.bashrc中添加环境变量，如果不存在则添加
if ! grep -q 'export PATH=$PATH:${HOME}/.tscl/bin' ~/.bashrc; then
    echo 'export PATH=$PATH:${HOME}/.tscl/bin' >>~/.bashrc
    echo "Added ${HOME}/.tscl/bin to PATH in .bashrc"
fi

# 退出
exit
