import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Card, message } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom'; // 引入 useSearchParams 获取 URL 参数

const { Option } = Select;

// 接收 posts 和 onUpdatePost
const WritePost = ({ user, posts, onAddPost, onUpdatePost }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form] = Form.useForm(); // 获取 form 实例
  const [loading, setLoading] = useState(false);

  // 获取 URL 中的 id 参数 (?id=xxx)
  const postId = searchParams.get('id');
  // 判断是否为编辑模式
  const isEditMode = !!postId;

  // 权限检查：如果不是管理员，禁止访问
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      message.error('你的魔力不足以刻录卷轴！(仅限大法师)');
      navigate('/');
    }
  }, [user, navigate]);

  // 初始化：如果是编辑模式，回显数据
  useEffect(() => {
    // 如果没有权限，直接返回，不再执行后续逻辑
    if (!user || user.role !== 'admin') return;

    if (isEditMode && posts) {
      const postToEdit = posts.find(p => p.id === postId);
      if (postToEdit) {
        // 自动填入表单
        form.setFieldsValue({
          title: postToEdit.title,
          cover: postToEdit.cover,
          tags: postToEdit.tags,
          content: postToEdit.content
        });
      } else {
        message.error('未找到该文章');
        navigate('/');
      }
    } else {
      // 如果是新建模式，重置表单
      form.resetFields();
    }
  }, [isEditMode, postId, posts, form, navigate]);

  // 表单提交处理
  const onFinish = (values) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      
      if (isEditMode) {
        // 编辑模式：调用更新函数
        onUpdatePost({
          id: postId, // 别忘了把 ID 带上
          ...values
        });
      } else {
        // 新建模式：调用新增函数
        onAddPost(values);
      }
      
      navigate('/');
    }, 500);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('请检查表单填写是否正确');
  };

  return (
    <div className="write-post-container">
      <Card title={isEditMode ? "重铸卷轴" : "刻录新卷轴"} bordered={false}>
        <Form
          form={form} // 绑定 form 实例
          name="write_post"
          layout="vertical" // 纵向布局
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{
            tags: [], // 默认标签为空
          }}
        >
          {/* 标题字段 */}
          <Form.Item
            label="卷轴标题"
            name="title"
            rules={[{ required: true, message: '请输入卷轴标题！' }]}
          >
            <Input placeholder="请输入引人注目的标题" size="large" className="magic-input" />
          </Form.Item>

          {/* 封面图片字段 */}
          <Form.Item
            label="封面幻象 (URL)"
            name="cover"
            rules={[{ type: 'url', message: '请输入有效的 URL！' }]}
          >
            <Input placeholder="https://example.com/image.jpg" className="magic-input" />
          </Form.Item>

          {/* 标签字段 (多选) */}
          <Form.Item
            label="元素属性 (标签)"
            name="tags"
            rules={[{ required: true, message: '请至少选择一个标签！', type: 'array' }]}
          >
            <Select mode="tags" 
            placeholder="请选择标签"
            tokenSeparators={[',']}
            >
              <Option value="React">React</Option>
              <Option value="Ant Design">Ant Design</Option>
              <Option value="JavaScript">JavaScript</Option>
              <Option value="Web">Web 开发</Option>
              <Option value="生活">生活</Option>
            </Select>
          </Form.Item>

          {/* 内容字段 (多行文本) */}
          <Form.Item
            label="文章内容 (支持 Markdown)"
            name="content"
            rules={[{ required: true, message: '请输入卷轴内容！' }]}
          >
            <Input.TextArea 
              rows={15} 
              placeholder="在此刻录 Markdown 符文..." 
              showCount 
              maxLength={10000}
              className="magic-input"
            />
          </Form.Item>

          {/* 提交按钮 */}
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} size="large">
              {isEditMode ? "重铸完成" : "完成刻录"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default WritePost;