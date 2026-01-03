import React from 'react';
import { Timeline, Card, Empty, Typography, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment'; // 引入 moment 方便处理日期

const { Title } = Typography;

const Archive = ({ posts }) => {
  // 如果没有文章，显示空状态
  if (!posts || posts.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <Empty description="暂无卷轴，快去刻录一篇吧！" />
      </div>
    );
  }

  // 1. 数据分组逻辑
  // 将文章按 "YYYY年MM月" 进行分组
  const postsByMonth = posts.reduce((groups, post) => {
    // 获取文章日期的 "YYYY年MM月" 格式
    const month = moment(post.createdAt).format('YYYY年MM月');
    
    if (!groups[month]) {
      groups[month] = [];
    }
    groups[month].push(post);
    return groups;
  }, {});

  // 获取所有月份的 key，并按时间倒序排列
  // Object.keys 拿到的是 ["2023年12月", "2023年11月"]
  const sortedMonths = Object.keys(postsByMonth).sort((a, b) => {
    return moment(b, 'YYYY年MM月').valueOf() - moment(a, 'YYYY年MM月').valueOf();
  });

  return (
    <div className="archive-container" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card bordered={false}>
        <Title level={2} style={{ marginBottom: 40, textAlign: 'center' }}>
          记忆回廊
        </Title>
        
        <Timeline mode="left">
          {/* 2. 双重循环渲染 */}
          {sortedMonths.map(month => (
            <React.Fragment key={month}>
              {/* 渲染月份标题节点 */}
              <Timeline.Item 
                dot={<ClockCircleOutlined style={{ fontSize: '20px', color: '#ffd700' }} />}
                color="gold"
              >
                <Tag color="#ffd700" style={{ fontSize: '1.1rem', padding: '5px 10px', borderRadius: 0, color: '#000', fontWeight: 'bold' }}>
                  {month}
                </Tag>
              </Timeline.Item>

              {/* 渲染该月份下的所有文章 */}
              {postsByMonth[month].map(post => (
                <Timeline.Item key={post.id} label={<span style={{ color: '#e0e0e0' }}>{moment(post.createdAt).format('DD日')}</span>}>
                  <Link to={`/post/${post.id}`} style={{ fontSize: '1.2rem', color: '#ffd700', fontFamily: "'VT323', monospace" }}>
                    {post.title}
                  </Link>
                  <span style={{ marginLeft: 8, color: '#8b8b99', fontSize: '0.9rem' }}>
                    ({post.author})
                  </span>
                </Timeline.Item>
              ))}
            </React.Fragment>
          ))}
        </Timeline>
      </Card>
    </div>
  );
};

export default Archive;