# VPS 部署方案：本地构建 + rsync + Nginx 静态托管

把站点从 GitHub Pages 迁移到自有 VPS。流程：**本地 `jekyll build` 生成 `_site/` → purgecss 清理 CSS → rsync 到 VPS → Nginx 托管 + Let's Encrypt TLS**。

GitHub 仓库继续作为私有源码托管，不再承担部署职责。

---

## 0. 前置条件

### 本地（Mac）

系统自带 Ruby 是 2.6，**版本不够**（CI 用 3.3.5）。先装一个 3.x：

```bash
brew install ruby@3.3          # 或用 rbenv / mise 管理多版本
# 把 brew 的 ruby 放到 PATH 前面（按 brew 提示操作），重开终端后确认：
ruby -v                        # 应显示 3.3.x

gem install bundler
bundle install                 # 安装 al_folio_* 等 gem
npm ci                         # 装 purgecss 等（见下）
```

purgecss 当前不在 `package.json` 的依赖里（CI 用 `npm install -g purgecss`）。本地任选其一：

```bash
npm install -g purgecss        # 全局
# 或临时：npx purgecss -c purgecss.config.js
```

可选（仅当用到对应功能时需要）：

- **ImageMagick**（`imagemagick.enabled: true` 的响应式图片）：`brew install imagemagick`
- **nbconvert**（Jupyter notebook 文章）：`pip install nbconvert`

### VPS

- 一台能 SSH 的 Linux（Debian/Ubuntu 示例）
- 已解析到 VPS IP 的域名（如 `blog.example.com`）
- 开放 80 / 443 端口

---

## 1. 修改站点配置

只改一处：`_config.yml` 的 `url`，换成你的新域名。`baseurl` 保持为空（根路径部署）。

```yaml
url: https://blog.example.com   # 改成你的域名
baseurl:                        # 留空
```

> 注意：`url` 影响 sitemap、RSS、Open Graph、canonical link、绝对链接等。改错会导致这些指向旧的 github.io。

> Giscus 评论：`deploy.yml` 里有一步会把 `giscus.repo` 自动改成仓库名。本地构建没有这步，所以确认 `_config.yml` 里 `giscus.repo` 已是正确的仓库（私有仓库的 giscus 需要该仓库开启 Discussions 且安装 giscus app，否则评论不可用 —— 可按需关闭评论功能）。

---

## 2. 本地构建脚本

新增 `bin/build-static`（或手动执行下列命令），产出纯静态 `_site/`：

```bash
#!/usr/bin/env bash
set -euo pipefail

export JEKYLL_ENV=production
bundle exec jekyll build                  # baseurl 为空，不传 --baseurl
purgecss -c purgecss.config.js            # 原地清理 _site/assets/css
echo "Build done → _site/"
```

构建产物在 `_site/`，是完全静态、可直接托管的文件树。

---

## 3. rsync 到 VPS

VPS 上准备一个 web 根目录（示例 `/var/www/blog`）：

```bash
# 在 VPS 上执行一次
sudo mkdir -p /var/www/blog
sudo chown -R "$USER":"$USER" /var/www/blog
```

本地推送（在仓库根目录执行，注意 `_site/` 末尾斜杠）：

```bash
rsync -avz --delete _site/ user@vps-ip:/var/www/blog/
```

- `--delete`：删除目标端多余文件，保持与本地构建一致。
- `-z`：压缩传输。
- 首次可加 `--dry-run` 预览将要传输/删除的文件。

可把上面两步合成一个 `bin/deploy-vps`：

```bash
#!/usr/bin/env bash
set -euo pipefail

REMOTE="user@vps-ip"
REMOTE_DIR="/var/www/blog/"

export JEKYLL_ENV=production
bundle exec jekyll build
purgecss -c purgecss.config.js
rsync -avz --delete _site/ "${REMOTE}:${REMOTE_DIR}"
echo "Deployed to ${REMOTE}:${REMOTE_DIR}"
```

> 用 SSH key 免密登录（`ssh-copy-id user@vps-ip`），rsync 才能无交互运行。

---

## 4. Nginx 配置

VPS 上安装 Nginx：

```bash
sudo apt update && sudo apt install -y nginx
```

新建站点配置 `/etc/nginx/sites-available/blog`：

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name blog.example.com;

    root /var/www/blog;
    index index.html;

    # Jekyll 生成的是 /path/index.html，直接按目录匹配
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # 404 页面（al-folio 生成 404.html）
    error_page 404 /404.html;

    # 静态资源缓存（assets 带 hash/版本，可长缓存）
    location ~* \.(css|js|png|jpg|jpeg|gif|svg|webp|woff2?|ttf|eot|ico)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

启用并重载：

```bash
sudo ln -s /etc/nginx/sites-available/blog /etc/nginx/sites-enabled/
sudo nginx -t                # 测试配置
sudo systemctl reload nginx
```

此时 `http://blog.example.com` 应可访问。

---

## 5. TLS（Let's Encrypt）

用 certbot 自动签发并配置 HTTPS：

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d blog.example.com
```

certbot 会自动改写 Nginx 配置加上 443/证书，并设好自动续期（`systemctl list-timers` 里有 `certbot.timer`）。完成后 `https://blog.example.com` 生效，HTTP 自动跳 HTTPS。

---

## 6. 清理 GitHub Pages 相关（可选）

迁移完成、确认 VPS 站点正常后，按需清理：

- 删除/禁用 `.github/workflows/deploy.yml`（不再往 gh-pages 部署）。
- GitHub 仓库 Settings → Pages 关闭 Pages，删除 `gh-pages` 分支。
- 如果之前有 `CNAME` 文件（自定义域名指向 github.io），删掉。
- `bin/deploy`（gh-pages 推送脚本）可删除或保留备用。

---

## 日常更新流程

之后每次改完内容：

```bash
# 1. 本地改内容、提交到私有仓库
git add . && git commit -m "..." && git push

# 2. 构建并部署到 VPS
bin/deploy-vps          # 或手动跑 build + purgecss + rsync
```

无需在 VPS 上装 Ruby/Jekyll —— VPS 只当静态文件服务器。

---

## 备选：以后想自动化

如果手动 rsync 觉得烦，可升级为：

- **GitHub Actions 自助部署**：复用现有 `deploy.yml` 的 build 步骤，把最后的 `github-pages-deploy-action` 换成 `rsync over SSH`（用 `appleboy/scp-action` 或 `burnett01/rsync-deployments`，VPS 的 SSH key 存入仓库 Secrets）。push 即自动上线，VPS 仍只托管静态文件。
- **VPS 本地构建**：VPS 装 Ruby 工具链，`git pull` 后本地 `jekyll build`。但需要在 VPS 维护 Ruby/gem 环境，较重，不推荐用于纯静态站点。
