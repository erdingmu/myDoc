# 搭建SSR

#### SSR一键安装脚本

* 本一键安装脚本为服务器端使用，即SSR服务端一键安装。
* 服务器系统： CentOS 6 及以上、Debian 7 及以上、Ubuntu 12 及以上
* 系统内存支持128M及以上，推荐256M起步。

1. 在电脑端打开Putty，连接VPS服务器，以root用户登录。
2. 登录成功后，依次运行以下三条命令：

        wget --no-check-certificate -O shadowsocks-all.sh https://raw.githubusercontent.com/teddysun/shadowsocks_install/master/shadowsocks-all.sh
        chmod +x shadowsocks-all.sh
        ./shadowsocks-all.sh 2>&1 | tee shadowsocks-all.log

3. 接下来会有几个参数需要选择，完成选择后SSR服务器就已经自动安装成功了。保险起见，输入reboot重启VPS服务器，SSR会自动随系统重启

         启动SSR：
         /etc/init.d/shadowsocks-r start
         退出SSR：
         /etc/init.d/shadowsocks-r stop
         重启SSR：
         /etc/init.d/shadowsocks-r restart
         SSR状态：
         /etc/init.d/shadowsocks-r status
         卸载SSR：
         ./shadowsocks-all.sh uninstall

4. 另外如果需要更改SSR的相关配置参数，配置文件位置在：/etc/shadowsocks-r/config.json

#### SSR各平台客户端下载

* SSR WINDOWS客户端

  ps：如果运行时提示错误，那么需要先安装Microsoft .NET Framework 4

       https://github.com/shadowsocksrr/shadowsocksr-csharp/releases/download/4.9.0/ShadowsocksR-win-4.9.0.zip

* SSR 安卓客户端

       https://github.com/shadowsocksrr/shadowsocksr-android/releases/download/3.5.4/shadowsocksr-android-3.5.4.apk

* SSR 苹果IOS客户端

       由于政策原因，国内APP Store的主流代理软件都已下架，其中包含Potatso，需要获取Potatso需要先申请一个美区APP ID

* SSR MAC客户端

       https://github.com/qinyuhang/ShadowsocksX-NG-R/releases/download/1.4.3-R8-build3/ShadowsocksX-NG-R8.dmg
