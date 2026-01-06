# 见习魔法师的手记 (Magic Blog) 🧙‍♂️

> 一个基于 React + Ant Design 的沉浸式“魔法风格”个人博客系统。

## 📜 项目介绍
本项目打破了传统博客枯燥的 CRUD 体验，将“魔法/RPG”元素融入 UI 设计。用户可以在这个“法师塔”中刻录卷轴（写文章）、查阅魔法书（阅读）、注入魔力（点赞）以及进行记忆检索（搜索）。

项目采用纯前端架构，利用 `LocalStorage` 进行数据持久化，支持完整的文章管理流和用户权限控制。

## ✨ 已完成的核心功能

### 1. 文章管理 (Content Management)
- **增删改查 (CRUD)**：完整的文章生命周期管理。
- **Makdown 支持**：使用 `react-markdown` 渲染富文本内容，支持代码高亮。
- **魔法书架**：文章列表展示，支持标签分类。

### 2. 用户与权限 (User & Permissions)
- **双角色系统**：严格区分 **大法师 (Admin)** 和 **访客 (Visitor)**。
- **注册/登录**：支持访客注册新账号，系统自动识别身份。
- **权限路由**：敏感操作（如发布、编辑、删除）受到路由守卫保护，仅管理员可用。

### 3. 数据持久化 (Persistence)
- 所有数据（文章、用户信息、评论、点赞状态）均存储于浏览器 `LocalStorage`，刷新页面不丢失。

---

## 🏆 额外加分项完成情况 (Bonus Features)

本项目实现了以下加分功能（总计可覆盖满分 10 分）：

### 1. 📱 响应式设计 (Responsive Design) - [5分]
- **完美适配**：利用 Ant Design 的 `Grid` 栅格系统和 `useBreakpoint` 钩子。
- **移动端体验**：在手机端自动切换为抽屉式（Drawer）侧边导航栏，布局自动调整为单列模式。

### 2. 🔍 搜索优化 (Search & Filter) - [5分]
- **真视之眼 (全文搜索)**：实现了基于前端的实时检索引擎。
- **高级筛选**：支持同时对 **文章标题**、**文章内容 (Markdown)** 以及 **文章标签** 进行关键词模糊匹配。

### 3. 🎨 动画效果 (Animations) - [5分]
- **沉浸式体验**：集成了全局背景粒子特效 (`BackgroundEffects`)。
- **交互微动效**：按钮悬停光效、输入框魔力激活效果。
- **创意动画**：归档页面的“记忆回廊”倒转时钟动画。

### 4. 🌙 个性化主题 (Custom Themes) - [5分]
- **动态主题切换**：内置“光、暗、火、冰、自然、土”等 6 种元素魔法主题色。
- **实时渲染**：通过 CSS 变量 (`--accent-gold`) 实现全站主色调的一键秒切。

---

## 🛠️ 技术栈 (Tech Stack)
- **Core**: React 18, React Router v6
- **UI**: Ant Design v5, CSS Modules
- **Utils**: UUID, Moment.js, React Markdown
- **Build**: Create React App (Webpack)

## 🚀 如何运行 (How to run)

### `npm install`
安装项目依赖。

### `npm start`
启动开发服务器，访问 `http://localhost:3000`。

### `npm run build`
打包项目用于生产环境发布。

