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

#### 卸载阿里云盾（安骑士）服务

   ps：如果运行时提示错误，那么需要先安装Microsoft .NET Framework 4

       $ wget http://update.aegis.aliyun.com/download/uninstall.sh
       $ chmod +x uninstall.sh
       $ ./uninstall.sh
       Stopping aegis                                                           [  OK  ]
       umount: /usr/local/aegis/aegis_debug: mountpoint not found
       Uninstalling aegis                                                       [  OK  ]

       $ wget http://update.aegis.aliyun.com/download/quartz_uninstall.sh
       $ chmod +x quartz_uninstall.sh
       $ ./quartz_uninstall.sh
       Stopping aegis                                                           [  OK  ]
       Stopping quartz                                                          [  OK  ]
       Uninstalling aegis_quartz                                                [  OK  ]

       $ pkill aliyun-service
       $ rm -rf /etc/init.d/agentwatch /usr/sbin/aliyun-service /usr/local/aegis*
       $ rm uninstall.sh
       $ rm quartz_uninstall.sh

#### 阿里云搭建shadowsocksrr服务端
    
   1、由于安装的是python 版本的 shadowsocks，所以首先安装pip
        
      $ curl "https://bootstrap.pypa.io/get-pip.py" -o "get-pip.py"
      $ python get-pip.py
   
  2、安装shadowsocks
     
      $ pip install --upgrade pip
      $ pip install shadowsocks
  
  3、创建配置文件
   
      {
            "server":"0.0.0.0",
            "server_port":5678,
            "local_address": "127.0.0.1",
            "local_port":1080,
            "password":"ssh123456",
            "timeout":120,
            "method":"chacha20",
            "obfs":"plain",
            "protocol":"origin",
            "fast_open": false,
            "workers": 1
        }
        
   4、启动shadowsocks
     
     #启动
     ssserver -c /etc/shadowsocks.json -d start
     #停止
     ssserver -c /etc/shadowsocks.json -d stop
     #重启
     ssserver -c /etc/shadowsocks.json -d restart
