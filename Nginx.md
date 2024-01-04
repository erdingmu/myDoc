# nginx配置

#### 404返回首页

    location /{
      try_files $uri $uri/ /index.php;
    }
    
### websocket反向代理

    location ~/(wss|socket.io) /{
        # 此处改为 socket.io 后端的 ip 和端⼝即可 
        proxy_pass http://127.0.0.1:2000; 
        proxy_set_header Upgrade $http_upgrade; proxy_set_header Connection "upgrade";
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
    }
    
### ThinkPHP设置后缀访问指定模块

    location /icbc {
        rewrite ^/icbc(.*)$ /index.php?s=/admin$1 last;
    }
    
### 设置子域名与模块相同的根目录

    if ($host ~* ^v08v.com) {
        set $device phone;
    }
    if ($host ~* ^www.v08v.com) {
        set $device phone;
    }
    # 匹配子域名
    if ($host ~* ^([^\.]+)\.v08v\.com$) {
        set $subdomain $1;
    }
    if ($subdomain ~* ^$) {
        set $device phone;
    }
    # 设置子域名与模块相同的根目录(api|admin)
    if ($subdomain ~* ^(api|admin)$) {
        set $rootdir /www/wwwroot/src/${subdomain}/web;
    }
    # 设置子域名与模块不同的根目录(i|res)
    if ($subdomain ~* ^i$) {
        set $rootdir /www/wwwroot/src/member/web;
    }
    if ($subdomain ~* ^d$) {
        set $rootdir /www/wwwroot/src/distributor/web;
    }
    if ($subdomain ~* ^sys$) {
        set $rootdir /www/wwwroot/src/backend/web;
    }
    if ($subdomain ~* ^(res|img)$) {
        set $rootdir /www/wwwroot/src/resource/web;
    }

    root $rootdir;