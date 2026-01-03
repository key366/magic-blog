import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// 模拟文章数据
export const mockPosts = [
  {
    id: uuidv4(),
    title: '我的第一篇 React 博客',
    content: '## 大家好\n\n这是我用 React + Ant Design 构建的第一个博客系统。感觉非常棒！\n\nReact 的组件化思想让我深受启发...',
    author: 'Admin',
    createdAt: moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss'),
    tags: ['React', '前端', '心得'],
    cover: 'https://picsum.photos/800/400?random=1', // 随机图片
    likes: 10,
    comments: [
      {
        id: uuidv4(),
        author: 'User1',
        content: '这个博客系统真不错！',
        createdAt: moment().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      {
        id: uuidv4(),
        author: 'User2',
        content: '谢谢分享！',
        createdAt: moment().subtract(30, 'minutes').format('YYYY-MM-DD HH:mm:ss'),
        avatar: 'https://i.pravatar.cc/150?img=4'
      }
    ]
  },
  {
    id: uuidv4(),
    title: 'Ant Design 5.0 新特性解析',
    content: 'Ant Design 5.0 带来了全新的 Design Token 系统，让主题定制变得前所未有的简单...',
    author: 'Admin',
    createdAt: moment().subtract(5, 'hours').format('YYYY-MM-DD HH:mm:ss'),
    tags: ['Ant Design', 'UI'],
    cover: 'https://picsum.photos/800/400?random=2',
    likes: 5,
    comments: [
      {
        id: uuidv4(),
        author: 'User3',
        content: '这个博客系统真不错！',
        createdAt: moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss'),
        avatar: 'https://i.pravatar.cc/150?img=5'
      }

    ]
  },
  {
    id: uuidv4(),
    title: 'JavaScript 闭包详解',
    content: '闭包是 JavaScript 中最难理解但也最强大的概念之一。简单来说，闭包就是...',
    author: 'Admin',
    createdAt: moment().subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss'),
    tags: ['JavaScript', '基础'],
    cover: 'https://picsum.photos/800/400?random=3',
    likes: 20,
    comments: [
      {
        id: uuidv4(),
        author: 'User4',
        content: '这个博客系统真不错！',
        createdAt: moment().subtract(3, 'days').format('YYYY-MM-DD HH:mm:ss'),
        avatar: 'https://i.pravatar.cc/150?img=6'
      }
    ]   
  }
];