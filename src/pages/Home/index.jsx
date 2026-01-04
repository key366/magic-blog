import React, { useState } from 'react'; // 引入 useState
import { List, Card, Tag, Space, Input } from 'antd';
import { ClockCircleOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// 接收 props 里的 posts 和 onDelete
const Home = ({ user, posts, onDelete }) => {
  const [searchText, setSearchText] = useState('');

  // 过滤逻辑：根据标题或标签搜索
  const filteredPosts = posts.filter(post => {
    const lowerText = searchText.toLowerCase();
    return (
      post.title.toLowerCase().includes(lowerText) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowerText)) ||
      post.content.toLowerCase().includes(lowerText)
    );
  });

  return (
    <div className="home-container" style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* 搜索框区域 */}
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Input
          placeholder="咏唱咒语以搜寻记忆... (搜索标题/内容/标签)"
          prefix={<SearchOutlined style={{ color: '#ffd700' }} />}
          onChange={e => setSearchText(e.target.value)}
          className="magic-input"
          style={{
            maxWidth: '500px',
            padding: '10px',
          }}
        />
      </div>

      <Card bordered={false} style={{ background: 'transparent' }}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={filteredPosts} // 使用过滤后的数据
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={[
                <IconText icon={UserOutlined} text={item.author} key="list-vertical-star-o" />,
                <IconText icon={ClockCircleOutlined} text={item.createdAt} key="list-vertical-like-o" />,
                user && <button style={{ border: 'none', background: 'none', color: '#ff5c5c', cursor: 'pointer', fontFamily: 'inherit' }} onClick={() => onDelete(item.id)}>销毁卷轴</button>
              ]}
              extra={
                // 如果有封面图才显示
                item.cover && (
                  <img
                    width={272}
                    alt="logo"
                    src={item.cover}
                    style={{ borderRadius: '0', objectFit: 'cover', border: '2px solid #000' }}
                  />
                )
              }
            >
              <List.Item.Meta
                title={<Link to={`/post/${item.id}`} style={{ fontSize: '1.5rem' }}>{item.title}</Link>}
                description={
                  <Space>
                    {item.tags.map(tag => (
                      <Tag key={tag} color="#ffd700" style={{ borderRadius: 0, color: '#000', fontWeight: 'bold', border: '1px solid #000' }}>{tag}</Tag>
                    ))}
                  </Space>
                }
              />
              {item.content.substring(0, 100) + '...'}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Home;