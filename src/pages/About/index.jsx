import React, { useState } from 'react';
import { Card, Avatar, Descriptions, Tag, Divider, Typography, Button, Modal, Form, Input, message } from 'antd';
import { GithubOutlined, MailOutlined, EnvironmentOutlined, GlobalOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const About = ({ user }) => {
  // 1. 定义个人信息状态
  const [userInfo, setUserInfo] = useState({
    name: '见习法师',
    intro: '正在修习 React 奥术的旅法师。致力于用代码符文构建数字世界，目前正在攻克“组件化”与“状态管理”两大难关。',
    location: '法师塔 (Library)',
    website: 'https://www.bcxcbcny.top',
    job: '奥术构造师 (前端)',
    hobbies: '研读卷轴(文档)、刻录符文(Coding)、探索迷宫(Debug)'
  });

  // 2. 控制 Modal 显示/隐藏的状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 创建 Form 实例，用于在 Modal 关闭时重置表单或手动获取值
  const [form] = Form.useForm();

  // 点击编辑按钮
  const showModal = () => {
    // 打开 Modal 前，先把当前的 userInfo 填入表单
    form.setFieldsValue(userInfo);
    setIsModalOpen(true);
  };

  // 点击 Modal 的确定按钮
  const handleOk = () => {
    // 触发表单验证并获取值
    form.validateFields().then((values) => {
      // values 就是表单里填的新数据
      console.log('New Info:', values);
      
      // 更新页面显示的 State
      setUserInfo({
        ...userInfo, // 保留原来的（比如头像没改）
        ...values    // 覆盖修改的
      });
      
      message.success('个人信息更新成功！');
      setIsModalOpen(false);
    }).catch((info) => {
      console.log('Validate Failed:', info);
    });
  };

  // 点击 Modal 的取消按钮
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="about-container" style={{ maxWidth: 800, margin: '0 auto' }}>
      
      {/* 顶部卡片 */}
      <Card bordered={false} style={{ textAlign: 'center', marginBottom: 24 }}>
        {/* 编辑按钮：绝对定位在右上角，仅登录可见 */}
        {user && (
          <Button 
            type="primary" 
            shape="circle" 
            icon={<EditOutlined />} 
            size="large"
            style={{ position: 'absolute', right: 24, top: 24 }}
            onClick={showModal}
          />
        )}

        <Avatar 
          size={100} 
          src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" 
          style={{ marginBottom: 16, border: '2px solid #f0f0f0' }}
        />
        <Title level={2}>{userInfo.name}</Title>
        <Paragraph type="secondary" style={{ fontSize: '1.1rem' }}>
          {userInfo.intro}
        </Paragraph>
        
        <div style={{ marginTop: 16 }}>
          <a href="https://github.com/key366" target="_blank" rel="noreferrer" style={{ margin: '0 12px', color: '#333', fontSize: '1.5rem' }}>
            <GithubOutlined />
          </a>
          <a href={`mailto:2934107808@qq.com`} style={{ margin: '0 12px', color: '#333', fontSize: '1.5rem' }}>
            <MailOutlined />
          </a>
        </div>
      </Card>

      {/* 个人信息卡片 */}
      <Card title="个人信息" bordered={false} style={{ marginBottom: 24 }}>
        <Descriptions column={{ xs: 1, sm: 2 }} layout="vertical">
          <Descriptions.Item label={<><EnvironmentOutlined /> 居住地</>}>
            {userInfo.location}
          </Descriptions.Item>
          <Descriptions.Item label={<><GlobalOutlined /> 个人网站</>}>
            {userInfo.website}
          </Descriptions.Item>
          <Descriptions.Item label="职业">
            {userInfo.job}
          </Descriptions.Item>
          <Descriptions.Item label="兴趣爱好">
            {userInfo.hobbies}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* 技能栈卡片 (保持不变) */}
      <Card title="技能栈" bordered={false}>
        <Title level={5}>前端核心</Title>
        <div style={{ marginBottom: 16 }}>
          <Tag color="magenta">HTML5</Tag>
          <Tag color="red">CSS3</Tag>
          <Tag color="gold">JavaScript (ES6+)</Tag>
          <Tag color="blue">TypeScript</Tag>
        </div>
        <Divider />
        <Title level={5}>框架与库</Title>
        <div style={{ marginBottom: 16 }}>
          <Tag color="cyan">React</Tag>
          <Tag color="geekblue">Ant Design</Tag>
          <Tag color="purple">Redux</Tag>
          <Tag color="green">Vue.js</Tag>
        </div>
      </Card>

      {/* 
        Modal 组件 
        open: 控制显示隐藏
        onOk: 点击确定
        onCancel: 点击取消
      */}
      <Modal 
        title="编辑个人资料" 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        okText="保存"
        cancelText="取消"
      >
        <Form
          form={form} // 绑定 form 实例
          layout="vertical"
          name="user_info_form"
        >
          <Form.Item
            name="name"
            label="昵称"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="intro"
            label="个人简介"
          >
            <Input.TextArea rows={2} />
          </Form.Item>

          <Form.Item
            name="location"
            label="居住地"
          >
            <Input prefix={<EnvironmentOutlined />} />
          </Form.Item>

          <Form.Item
            name="website"
            label="个人网站"
          >
            <Input prefix={<GlobalOutlined />} />
          </Form.Item>

          <Form.Item
            name="job"
            label="职业"
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="hobbies"
            label="兴趣爱好"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default About;