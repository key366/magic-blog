# 软件开发课程设计报告

## 1、项目概述

### 1.1 项目简介
本项目名为“见习魔法师的手记”，是一个基于 React 框架开发的单页应用（SPA）个人博客系统。与传统博客不同，本项目融入了独特的“魔法/RPG”视觉风格，旨在为用户提供沉浸式的阅读与写作体验。系统不仅具备博客的核心功能（文章管理、阅读、互动），还通过高度定制化的 UI 设计（像素风字体、粒子特效、动态主题色、魔法动画）展示了前端开发的创意与技术实力。

### 1.2 项目主要研发内容和功能列表
本项目主要研发内容包括前端界面开发、组件逻辑实现、路由管理以及本地数据持久化方案的设计。

**核心功能列表：**
1.  **文章管理 (CRUD)**：
    *   **发布文章（刻录卷轴）**：支持 Markdown 语法编辑，支持设置封面图、分类和标签。
    *   **文章列表（魔法书架）**：支持按分类筛选、分页展示文章卡片。
    *   **文章搜索（真视之眼）**：支持对文章标题、内容、标签进行实时关键词搜索。
    *   **文章详情（阅读卷轴）**：渲染 Markdown 内容，支持代码高亮。
    *   **编辑与删除**：支持对已发布文章进行修改（重铸）或销毁。
2.  **用户互动**：
    *   **点赞（注入魔力）**：文章点赞功能，状态实时更新。
    *   **评论系统**：支持发表评论，评论数据本地存储。
3.  **个性化设置与视觉特效**：
    *   **动态主题（魔力色相）**：内置 6 种魔法主题色（如火球红、奥术紫、深渊蓝等），用户可一键切换全站主色调。
    *   **魔法动画**：包含背景粒子特效、输入框魔力激活效果、记忆回廊倒转时钟动画。
    *   **响应式布局**：适配 PC 端与移动端，移动端采用抽屉式导航。
4.  **系统功能**：
    *   **模拟登录/注册**：基于 LocalStorage 的用户身份验证，包含路由守卫与权限控制（如未登录不可编辑个人资料）。
    *   **数据持久化**：所有数据（文章、用户、设置）均存储在浏览器 LocalStorage 中，刷新不丢失。

### 1.3 技术栈说明
*   **核心框架**：React 18 (Hooks: useState, useEffect, useMemo, useContext)
*   **构建工具**：Create React App (Webpack)
*   **路由管理**：React Router v6 (实现嵌套路由、动态路由、路由守卫)
*   **UI 组件库**：Ant Design v5 (使用 Card, Form, Modal, Drawer, Message, Timeline 等组件)
*   **样式处理**：CSS Modules, CSS3 Animations (Keyframes), Google Fonts (VT323 像素字体)
*   **工具库**：
    *   `react-markdown` & `remark-gfm`: Markdown 渲染
    *   `moment`: 时间格式化
    *   `uuid`: 生成唯一 ID
*   **版本控制与部署**：Git, GitHub, Cloudflare Pages

---

## 2、系统需求分析

### 2.1 系统总体结构
本系统采用纯前端架构（Client-Side Rendering），通过浏览器本地存储（LocalStorage）模拟后端数据库。系统整体结构如下：

*   **表现层 (View)**：由 React 组件构成，负责页面渲染和用户交互。包括 `Layout`（布局）、`Pages`（页面）、`Components`（通用组件）。
*   **逻辑层 (Controller/Service)**：在 `App.js` 及各组件内部通过 Hooks 处理业务逻辑，如表单提交、状态更新、路由跳转、权限判断。
*   **数据层 (Model)**：使用 `localStorage` 存储 JSON 格式的数据，通过封装的工具函数进行读写操作。

### 2.2 项目发布指南
本项目基于 Node.js 环境开发，发布流程如下：

1.  **环境准备**：确保本地安装 Node.js (v14+) 和 npm。
2.  **依赖安装**：
    ```bash
    npm install
    ```
3.  **本地开发运行**：
    ```bash
    npm start
    # 访问 http://localhost:3000
    ```
4.  **项目打包**：
    ```bash
    npm run build
    # 生成 build 目录，包含静态资源文件 (html, css, js)
    ```
5.  **部署**：
    *   配置 `wrangler.json` 指定构建输出目录。
    *   将代码推送到 GitHub 仓库。
    *   连接 Cloudflare Pages 进行自动构建与部署。

---

## 3、系统设计

### 3.1 系统业务流程
1.  **访客流程**：
    *   进入首页 -> 使用搜索框查找文章 -> 点击文章卡片 -> 进入详情页阅读 -> (可选) 切换主题色 -> 查看归档时间轴。
2.  **管理员/作者流程**：
    *   点击登录 -> 输入凭证 -> 验证成功 -> 进入后台/首页。
    *   点击“刻录卷轴” -> 填写标题、内容、标签 -> 提交 -> 自动跳转回首页并显示新文章。
    *   进入文章详情 -> 点击“重铸”（编辑） -> 修改内容 -> 保存。
    *   进入文章详情 -> 点击“销毁”（删除） -> 确认删除 -> 文章移除。
    *   进入“关于我” -> 点击编辑按钮（仅登录可见） -> 修改个人资料 -> 保存。

### 3.2 系统功能模块设计
系统采用组件化设计，主要模块划分如下：

*   **Layout 模块**：
    *   `Header`：包含 Logo、导航菜单、主题色选择器、移动端抽屉菜单。
    *   `Footer`：版权信息、魔法阵装饰。
    *   `BackgroundEffects`：全局背景粒子特效组件。
*   **Pages 模块**：
    *   **Home (首页)**：
        *   组件：`PostList`, `SearchInput` (魔法输入框)。
        *   数据：从 `App.js` 接收 `posts`，内部维护 `searchText` 状态进行过滤。
    *   **PostDetail (文章详情)**：
        *   组件：Markdown 渲染器, 评论列表, 点赞按钮。
        *   功能：根据 URL ID 查找文章，支持点赞和评论交互。
    *   **WritePost (刻录/重铸)**：
        *   组件：Ant Design Form。
        *   功能：复用同一个表单组件，根据 URL 是否带 ID 判断是“新建”还是“编辑”。
    *   **Archive (记忆回廊)**：
        *   组件：Ant Design Timeline, MagicClock (倒转时钟动画)。
        *   功能：按月份对文章进行分组并倒序展示。
    *   **About (关于我)**：
        *   组件：个人信息卡片, 编辑模态框。
        *   功能：展示个人资料，**仅登录用户**可见编辑按钮。
*   **Components 模块**：
    *   `PostCard`：单个文章的摘要展示卡片。
    *   `ColorPicker`：主题色选择器。

### 3.3 Mock数据结构说明
系统主要数据存储在 LocalStorage 中，核心数据结构如下：

**1. 文章数据 (`my_blog_posts`) - Array<Object>**
```json
[
  {
    "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    "title": "React Hooks 学习笔记",
    "content": "## useEffect 的使用...",
    "tags": ["React", "前端"],
    "cover": "https://example.com/image.jpg",
    "createdAt": "2026-01-01T12:00:00.000Z",
    "likes": 5,
    "likedBy": ["Archmage"],
    "comments": [
      {
        "content": "写得不错！",
        "createdAt": "2026-01-02T10:00:00.000Z"
      }
    ]
  }
]
```

**2. 用户数据 (`my_blog_user`) - Object**
```json
{
  "username": "Archmage",
  "avatar": "wizard_icon.png",
  "bio": "探索代码奥秘的见习法师",
  "location": "法师塔",
  "website": "https://www.bcxcbcny.top"
}
```

**3. 主题设置 (`my_blog_theme_color`) - String**
```json
"#ffd700"
```

---

## 4、系统实现

### 4.1 源码clone地址和博客网址
*   **GitHub 源码仓库**：[https://github.com/key366/magic-blog](https://github.com/key366/magic-blog)
*   **在线演示地址**：[https://www.bcxcbcny.top](https://www.bcxcbcny.top)

### 4.2 系统主要界面展示
*(请在文档中插入以下截图)*

1.  **首页 (Home)**：展示魔法阵背景、魔法搜索框和文章卡片列表。
2.  **文章详情页 (Detail)**：展示 Markdown 渲染后的文章内容及评论区。
3.  **编辑页面 (Editor)**：展示带有魔法光效的输入表单。
4.  **记忆回廊 (Archive)**：展示时间轴及背景中的倒转时钟动画。
5.  **移动端适配 (Mobile)**：展示手机模式下的侧边栏菜单。
6.  **主题切换 (Theming)**：展示不同主题色下的界面效果。

---

## 5、项目总结与心得

通过本次《软件开发课设》的实践，我独立完成了一个从需求分析、设计到编码实现的完整 Web 项目。

**主要收获：**
1.  **React 实战能力提升**：深入理解了 React 的声明式编程思想，熟练掌握了 `useState`, `useEffect` 等 Hooks 的使用，学会了如何通过状态提升（Lifting State Up）来管理应用级数据。
2.  **组件化思维**：学会了将复杂页面拆解为独立的、可复用的组件（如 `PostCard`, `Header`），提高了代码的可维护性。
3.  **UI/UX 设计体验**：通过引入“魔法”主题，我尝试了大量的 CSS 动画（如倒转时钟、粒子特效）和自定义样式，理解了如何通过视觉设计提升用户体验，而不仅仅是实现功能。
4.  **工程化意识**：接触了 Git 版本控制、npm 包管理以及 Cloudflare 自动化部署流程，体会到了现代前端工程化的便利。

**不足与展望：**
目前项目数据存储在本地，无法跨设备同步。未来计划引入 Node.js 后端和数据库（如 MongoDB），实现真正的全栈开发，并增加多人协作功能。
