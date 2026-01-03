import React, { useState, useEffect } from 'react'; // 引入 useState, useEffect
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // 引入 Navigate 用于重定向
import { ConfigProvider, message, theme } from 'antd'; // 引入 theme 用于暗黑模式
import { v4 as uuidv4 } from 'uuid'; // 引入 uuid 生成 ID
import moment from 'moment'; // 引入 moment 处理时间

import AppLayout from './components/layout';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import PostDetail from './pages/PostDetail';
import WritePost from './pages/WritePost';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import BackgroundEffects from './components/BackgroundEffects'; // 引入背景特效组件
import { mockPosts } from './api/mockData'; // 引入初始数据

import './App.css';

function App() {
  // 0. 主题色状态管理
  const [primaryColor, setPrimaryColor] = useState(() => {
    return localStorage.getItem('my_blog_theme_color') || '#ffd700';
  });

  // 监听主题色变化，更新 CSS 变量
  useEffect(() => {
    document.documentElement.style.setProperty('--accent-gold', primaryColor);
    localStorage.setItem('my_blog_theme_color', primaryColor);
  }, [primaryColor]);

  // 1. 修改 user 初始化逻辑
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('my_blog_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // 1. 修改初始化逻辑：优先从 localStorage 读取
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('my_blog_posts');
    if (savedPosts) {
      return JSON.parse(savedPosts);
    } else {
      return mockPosts;
    }
  });

  // 2. 封装一个更新函数：同时更新 State 和 LocalStorage
  const updatePosts = (newPosts) => {
    setPosts(newPosts); // 更新内存状态（让页面重绘）
    localStorage.setItem('my_blog_posts', JSON.stringify(newPosts)); // 更新硬盘存储（持久化）
  };

  // 2. 修改登录函数
  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem('my_blog_user', JSON.stringify(userInfo)); // 存入
    message.success('登录成功！');
  };

  // 3. 修改登出函数
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('my_blog_user'); // 移除
    message.info('已退出登录');
  };

  // 3. 修改 handleAddPost：使用 updatePosts
  const handleAddPost = (newPostData) => {
    const newPost = {
      id: uuidv4(),
      ...newPostData,
      author: user.username,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
      likes: 0,      // 确保新文章也有这些字段
      comments: []   // 确保新文章也有这些字段
    };

    const newPostsList = [newPost, ...posts];
    updatePosts(newPostsList); // <--- 改用 updatePosts
    message.success('文章发布成功！');
  };
  const handleDelete = (postId) => {
    const newPosts = posts.filter(post => post.id !== postId);
    updatePosts(newPosts); // 使用 updatePosts 以确保删除操作也能持久化
    message.success('文章删除成功！');
  }
  // 4. 修改 handleUpdatePost：使用 updatePosts
  const handleUpdatePost = (updatedPostData) => {
    const newPosts = posts.map(post => {
      if (post.id === updatedPostData.id) {
        return { ...post, ...updatedPostData };
      }
      return post;
    });
    
    updatePosts(newPosts); // <--- 改用 updatePosts
    message.success('文章更新成功！');
  };

  // 5. 新增：处理点赞
  const handleLikePost = (postId) => {
    if (!user) {
      message.warning('请先登录后点赞');
      return;
    }

    const newPosts = posts.map(post => {
      if (post.id === postId) {
        const likedBy = post.likedBy || [];
        const isLiked = likedBy.includes(user.username);
        
        let newLikes = post.likes || 0;
        let newLikedBy = likedBy;

        if (isLiked) {
          // 如果已经点过赞，则取消点赞
          newLikes = Math.max(0, newLikes - 1);
          newLikedBy = likedBy.filter(u => u !== user.username);
        } else {
          // 如果没点过赞，则添加点赞
          newLikes = newLikes + 1;
          newLikedBy = [...likedBy, user.username];
        }

        return { ...post, likes: newLikes, likedBy: newLikedBy };
      }
      return post;
    });
    updatePosts(newPosts); // 保存到 localStorage
  };

  // 6. 新增：处理评论
  const handleAddComment = (postId, newComment) => {
    const newPosts = posts.map(post => {
      if (post.id === postId) {
        // 找到文章，添加评论
        return { 
          ...post, 
          comments: [...(post.comments || []), newComment] 
        };
      }
      return post;
    });
    updatePosts(newPosts); // 保存到 localStorage
    message.success('评论发表成功！');
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm, // 启用暗黑模式算法
        token: {
          colorPrimary: primaryColor, // 动态主题色
          colorBgBase: '#0f0f12',  // 背景基调：深黑
          colorBgContainer: '#22222b', // 容器背景：面板灰
          colorTextBase: '#e0e0e0', // 文字颜色
          fontFamily: "'VT323', monospace", // 全局字体
          borderRadius: 0,         // 像素风格通常是直角
        },
        components: {
          Card: {
            colorBgContainer: '#22222b', 
            colorBorderSecondary: '#000', // 黑色边框
            boxShadow: '5px 5px 0px rgba(0,0,0,0.5)', // 像素风阴影
          },
          Layout: {
            colorBgHeader: '#1a1a20', // 顶部导航栏深色
            colorBgBody: 'transparent', // 让 Layout 透明
          },
          Button: {
            borderRadius: 0,
            controlHeight: 40,
            fontSize: 18,
            fontWeight: 'bold',
          }
        }
      }}
    >
      <div className="scanlines"></div> {/* 添加扫描线效果 */}
      <BackgroundEffects /> {/* 添加魔法背景特效 */}
      <BrowserRouter>
        <div className="App">
          <Routes>
            {/* 把 user 和 handleLogout 传给 Layout，这样导航栏可以显示头像和退出按钮 */}
            <Route path="/" element={
              <AppLayout 
                user={user} 
                onLogout={handleLogout} 
                primaryColor={primaryColor} 
                onColorChange={setPrimaryColor} 
              />
            }>
              {/* 3. 把 posts 传给 Home */}
              <Route index element={<Home posts={posts} onDelete={handleDelete} />} />
              
              <Route path="archive" element={<Archive posts={posts} />} />
              <Route path="about" element={<About />} />
              <Route 
                path="post/:id" 
                element={
                  <PostDetail 
                    user={user}                   // 传下去，用于判断是否已点赞
                    posts={posts} 
                    onLike={handleLikePost}       // 传下去
                    onComment={handleAddComment}  // 传下去
                  />
                } 
              />
              
              {/* 4. 把 handleAddPost 传给 WritePost */}
              <Route 
                path="write" 
                element={
                  user ? (
                    <WritePost 
                    user={user} 
                    posts={posts}
                    onAddPost={handleAddPost} 
                    onUpdatePost={handleUpdatePost}
                    />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Route>
            
            {/* 把 handleLogin 传给 Auth 页面，让它能通知 App 登录成功 */}
            <Route 
              path="/auth" 
              element={
                user ? <Navigate to="/" replace /> : <Auth onLogin={handleLogin} />
              } 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
