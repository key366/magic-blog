import React, { useState } from 'react';
import { Card, Tabs, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const Auth = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login');

  // 登录表单提交
  const handleLoginSubmit = (values) => {
    console.log('Login attempt:', values);
    
    // 1. 优先检查内置管理员账号
    if (values.username === 'admin' && values.password === '123456') {
      onLogin({
        username: values.username,
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1' // 随机头像
      });
      return;
    } 
    
    // 2. 检查注册用户列表 (从 LocalStorage 获取)
    const storedUsers = JSON.parse(localStorage.getItem('my_blog_registered_users') || '[]');
    const foundUser = storedUsers.find(
      u => u.username === values.username && u.password === values.password
    );

    if (foundUser) {
      onLogin({
        username: foundUser.username,
        role: foundUser.role || 'visitor',
        avatar: foundUser.avatar
      });
    } else {
      message.error('用户名或密码错误！(试用管理员: admin / 123456)');
    }
  };

  // 注册表单提交
  const handleRegisterSubmit = (values) => {
    // 1. 获取现有用户列表
    const storedUsers = JSON.parse(localStorage.getItem('my_blog_registered_users') || '[]');
    
    // 2. 检查用户是否已存在
    const userExists = storedUsers.some(u => u.username === values.username);
    if (userExists) {
      message.error('该魔法师名号已被注册！');
      return;
    }

    // 3. 创建新用户
    const newUser = {
      username: values.username,
      password: values.password, // 注意：实际生产环境中密码必须加密存储！这里仅为演示。
      email: values.email,
      role: 'visitor',
      avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${values.username}` // 根据用户名生成头像
    };

    // 4. 保存到 LocalStorage
    storedUsers.push(newUser);
    localStorage.setItem('my_blog_registered_users', JSON.stringify(storedUsers));

    message.success('注册成功！请登录');
    setActiveTab('login'); // 自动切换回登录页
  };

  // 定义 Tab 的内容
  const items = [
    {
      key: 'login',
      label: '登录',
      children: (
        <Form
          name="login_form"
          onFinish={handleLoginSubmit} // 提交且校验通过后触发
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名 (admin)" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码 (123456)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: 'register',
      label: '注册',
      children: (
        <Form
          name="register_form"
          onFinish={handleRegisterSubmit}
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: '请输入邮箱!' },
              { type: 'email', message: '请输入有效的邮箱格式!' }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="邮箱" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        // background: '#f0f2f5' // 移除浅灰色背景，透出全局星空背景
      }}
    >
      <Card 
        style={{ width: 400, border: '2px solid #000' }} // 移除默认阴影，使用黑色边框
        bodyStyle={{ paddingTop: 0 }}
        bordered={false} // 让 ConfigProvider 的样式生效
      >
        <div style={{ textAlign: 'center', margin: '24px 0' }}>
          <h2 style={{ color: '#ffd700', fontWeight: 'bold', fontFamily: "'VT323', monospace", fontSize: '2.5rem', textShadow: '2px 2px #000' }}>法师塔入口</h2>
          <p style={{ color: '#8b8b99', fontFamily: "'VT323', monospace", fontSize: '1.2rem' }}>验证你的魔力印记</p>
        </div>
        
        <Tabs 
          activeKey={activeTab} // 受控模式
          onChange={setActiveTab} // 切换 Tab 时更新状态
          items={items} 
          centered 
        />
      </Card>
    </div>
  );
};

export default Auth;