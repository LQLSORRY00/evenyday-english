# PWA英语学习应用 - 可重用模板包

## 📦 包内容

这是一个完整的PWA英语学习应用，已优化移动端体验，包含以下功能：

### 核心功能
- ✅ **每日词汇** - 自动生成单词卡片、播放发音
- ✅ **阅读理解** - 文章阅读、播放原文、测试题
- ✅ **口语练习** - 录音识别（需HTTPS或localhost）
- ✅ **学习进度** - 跟踪学习统计数据
- ✅ **PWA支持** - 可安装到手机主屏幕

### 文件清单
```
pwa-package/
├── index.html              # 主页面
├── app.js                  # 核心逻辑
├── styles.css              # 样式文件
├── sw.js                   # Service Worker（离线缓存）
├── manifest.json           # PWA清单文件
├── icon.svg                # 应用图标
├── 启动本地服务器.bat       # 启动脚本（Windows）
├── PWA项目说明.md          # 项目文档
├── PWA安装指南.md          # 安装教程
└── README.md               # 本文件
```

## 🚀 快速开始

### 方法1：使用启动脚本（推荐）
1. 双击 `启动本地服务器.bat`
2. 浏览器自动打开 `http://localhost:8000`
3. 在手机上访问电脑的局域网IP（如 `http://192.168.x.x:8000`）

### 方法2：手动启动
1. 安装 Python 3.x
2. 在命令行运行：
   ```bash
   cd pwa-package
   python -m http.server 8000
   ```
3. 浏览器访问 `http://localhost:8000`

### 方法3：使用 Node.js
1. 安装 http-server：
   ```bash
   npm install -g http-server
   ```
2. 运行：
   ```bash
   cd pwa-package
   http-server -p 8000
   ```

## 📱 安装到手机

### Android
1. 在手机浏览器中打开应用（如 Chrome）
2. 点击菜单 → "添加到主屏幕" 或 "安装应用"
3. 按照提示完成安装

### iOS
1. 在 Safari 中打开应用
2. 点击分享按钮 → "添加到主屏幕"
3. 点击"添加"完成安装

**注意：**
- 首次安装需要在有网络的环境下进行
- 安装后可以在离线环境下使用（缓存内容）

## 🎯 自定义内容

### 修改词汇数据
编辑 `app.js` 中的 `vocabularyData` 数组：
```javascript
const vocabularyData = [
    { word: 'your-word', pronunciation: '/prəˌnʌnsiˈeɪʃn/', meaning: '意思', example: '例句' },
    // 添加更多单词...
];
```

### 修改阅读文章
编辑 `app.js` 中的 `readingData` 数组：
```javascript
const readingData = [
    {
        title: '文章标题',
        content: '文章内容...',
        questions: [
            { question: '问题1', options: ['A', 'B', 'C', 'D'], answer: 'A' }
        ]
    },
    // 添加更多文章...
];
```

### 修改应用信息
编辑 `manifest.json`：
```json
{
    "name": "你的应用名称",
    "short_name": "简称",
    "description": "应用描述",
    "background_color": "#ffffff",
    "theme_color": "#4CAF50"
}
```

## 🔧 技术特性

### 响应式设计
- 桌面端：侧边栏导航 + 主内容区
- 移动端：顶部导航栏 + 底部导航栏 + 单列布局
- 支持横竖屏切换

### 离线功能
- Service Worker 缓存静态资源
- 支持离线浏览已加载的内容

### 浏览器兼容性
- ✅ Chrome（推荐）
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ 部分功能在旧版本浏览器中可能不支持

## ⚠️ 已知限制

### 语音识别功能
- **要求**：HTTPS 或 localhost 环境
- **限制**：HTTP 环境下无法使用（浏览器安全限制）
- **替代方案**：使用 HTTPS 服务器或 localhost 测试

### 播放/暂停功能
- 暂停后继续播放会从头开始（API 限制）
- 这是 `speechSynthesis` API 的限制，无法精确保存播放位置

## 📝 修改历史

### v1.0 (2026-03-30)
- ✅ 初始版本发布
- ✅ 移动端响应式优化
- ✅ 播放/暂停功能修复
- ✅ 语音识别错误处理优化

## 📞 技术支持

如需自定义功能或遇到问题，请参考：
- `PWA项目说明.md` - 详细技术文档
- `PWA安装指南.md` - 安装教程

## 📄 许可证

本项目可自由使用和修改。
