# 快速部署指南

## 第一次使用（5分钟内完成）

### 步骤1：准备环境
确保电脑已安装：
- Python 3.x（推荐）或 Node.js
- 现代浏览器（Chrome 推荐）

### 步骤2：启动服务
**Windows用户**：
1. 双击 `启动本地服务器.bat`
2. 等待浏览器自动打开

**手动启动**：
```bash
cd pwa-package
python -m http.server 8000
```

### 步骤3：访问应用
- **电脑端**：http://localhost:8000
- **手机端**：http://[电脑IP]:8000
  - 查看电脑IP：Windows 运行 `ipconfig`，查找 IPv4 地址

### 步骤4：手机安装（可选）
1. 手机浏览器打开应用
2. 点击菜单 → "添加到主屏幕"
3. 按照提示完成安装

## 常见问题

### Q: 手机无法访问？
**A:** 检查以下几点：
- 确认手机和电脑在同一WiFi网络
- 确认电脑防火墙允许8000端口
- 尝试关闭防火墙或添加例外

### Q: 语音识别不能用？
**A:** 语音识别需要：
- HTTPS 或 localhost 环境
- 浏览器麦克风权限已授权
- HTTP 环境下会自动提示限制

### Q: 播放/暂停有问题？
**A:** 已优化：
- 暂停后继续会从头播放（API限制）
- 这是浏览器 Web Speech API 的限制，非程序bug

### Q: 如何修改内容？
**A:** 编辑 `app.js` 文件：
- `vocabularyData` - 修改每日词汇
- `readingData` - 修改阅读文章
- `appState` - 修改初始状态

### Q: 如何部署到服务器？
**A:** 方法1：静态托管
- 上传所有文件到任何静态托管服务（如 Vercel、Netlify）
- 确保使用 HTTPS

方法2：自建服务器
- 使用 Nginx、Apache 等服务器
- 配置 HTTPS 证书（Let's Encrypt 免费）

## 技术栈

- **前端**：纯 HTML/CSS/JavaScript（无框架依赖）
- **PWA**：Service Worker + Manifest
- **语音**：Web Speech API（浏览器原生）
- **图标**：SVG 格式

## 性能优化

- ✅ 按需加载内容
- ✅ Service Worker 缓存
- ✅ 响应式图片
- ✅ 最小化 DOM 操作

## 下一步

1. 自定义应用信息（manifest.json）
2. 替换图标（icon.svg）
3. 添加自定义内容（app.js）
4. 部署到生产环境（HTTPS）

## 获取帮助

- 查看完整文档：`PWA项目说明.md`
- 安装教程：`PWA安装指南.md`
- API参考：查看代码注释
