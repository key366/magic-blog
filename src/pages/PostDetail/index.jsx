import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Tag, Space, Button, Spin, Divider, List, Avatar, Input, message } from 'antd'; // 引入新组件
import { ArrowLeftOutlined, CalendarOutlined, UserOutlined, ThunderboltOutlined, ThunderboltFilled, EditOutlined } from '@ant-design/icons'; // 引入新图标
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import moment from 'moment'; // 引入 moment

// 注意：这里我们需要接收 posts 属性，因为我们要从最新的 posts 里找文章，而不是直接从 mockData 找
// 这样才能保证我们在首页删了文章，或者加了新文章后，详情页能正确反应
const PostDetail = ({ user, posts, onLike, onComment }) => { 
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [commentContent, setCommentContent] = useState(''); // 评论输入框内容

  // 其实甚至可以不需要 useEffect + useState(post)，直接用 useMemo 算出来
  // 但为了改动最小，我们先保留 useEffect 逻辑，或者直接在渲染时查找：
  const post = posts ? posts.find(p => p.id === id) : null;

  useEffect(() => {
    setLoading(false);
  }, []);

  // 判断当前用户是否已点赞
  const isLiked = post?.likedBy?.includes(user?.username);

  // 点赞处理
  const handleLike = () => {
    onLike(id); // 直接调用父组件函数
  };

  // 提交评论处理
  const handleSubmitComment = () => {
    if (!commentContent.trim()) {
      return message.warning('请输入评论内容');
    }

    const newComment = {
      id: Date.now(),
      author: '我', // 或者 user.username
      avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=999',
      content: commentContent,
      datetime: moment().format('YYYY-MM-DD HH:mm:ss'),
    };

    onComment(id, newComment); // 直接调用父组件函数
    setCommentContent(''); // 清空输入框
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '50px' }}><Spin size="large" /></div>;
  }

  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>文章未找到</h2>
        <Button type="primary" onClick={() => navigate('/')}>返回首页</Button>
      </div>
    );
  }

  return (
    <div className="post-detail-container" style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* 顶部操作栏：左边是返回，右边是编辑 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="link" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)}>
          返回
        </Button>

        {/* 编辑按钮 */}
        <Button 
          type="primary" 
          ghost // 幽灵按钮（透明背景）
          icon={<EditOutlined />} 
          onClick={() => navigate(`/write?id=${post.id}`)} // 跳转到编辑页，带上 ID
        >
          重铸卷轴
        </Button>
      </div>

      <Card>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>{post.title}</h1>
        
        <Space size="large" style={{ color: '#888', marginBottom: '2rem' }}>
          <span><UserOutlined /> {post.author}</span>
          <span><CalendarOutlined /> {post.createdAt}</span>
          <span>
            {post.tags && post.tags.map(tag => (
              <Tag key={tag} color="blue">{tag}</Tag>
            ))}
          </span>
        </Space>

        {post.cover && (
          <img 
            src={post.cover} 
            alt={post.title} 
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '2rem' }} 
          />
        )}

        <div className="markdown-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', minHeight: '200px' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        <Divider />

        {/* 点赞区域 */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Button 
            type={isLiked ? "primary" : "default"}
            shape="round" 
            icon={isLiked ? <ThunderboltFilled /> : <ThunderboltOutlined />} 
            size="large"
            onClick={handleLike}
            style={{ height: '50px', fontSize: '1.2rem' }}
          >
            {isLiked ? '魔力充盈' : '注入魔力'} {post.likes}
          </Button>
        </div>

        {/* 评论区域 */}
        <div className="comments-section">
          <h3 style={{ marginBottom: 20 }}>评论 ({post.comments.length})</h3>
          
          {/* 评论列表 */}
          <List
            dataSource={post.comments}
            header={`${post.comments.length} 条回复`}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.avatar} />}
                  title={
                    <Space>
                      <span>{item.author}</span>
                      <span style={{ color: '#ccc', fontSize: '12px' }}>{item.datetime}</span>
                    </Space>
                  }
                  description={item.content}
                />
              </List.Item>
            )}
          />

          {/* 写评论 */}
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=999" />
              <div style={{ flex: 1 }}>
                <Input.TextArea 
                  rows={4} 
                  value={commentContent}
                  onChange={e => setCommentContent(e.target.value)}
                  placeholder="写下你的评论..." 
                />
                <Button 
                  type="primary" 
                  style={{ marginTop: 10 }} 
                  onClick={handleSubmitComment}
                >
                  发表评论
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostDetail;