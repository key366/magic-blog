import React from 'react';
import { Card, Tabs, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const Auth = ({ onLogin }) => {
  // 登录表单提交
  const handleLoginSubmit = (values) => {
    console.log('Login Success:', values);
    // 模拟登录验证
    if (values.username === 'admin' && values.password === '123456') {
      // 调用父组件传下来的 onLogin 函数，把用户信息传回去
      onLogin({
        username: values.username,
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1' // 随机头像
      });
    } else {
      message.error('用户名或密码错误！(试用: admin / 123456)');
    }
  };

  // 注册表单提交
  const handleRegisterSubmit = (values) => {
    console.log('Register Success:', values);
    message.success('注册成功！请登录');
    // 这里通常会调用注册接口，成功后自动切换到登录 Tab
    // 为了演示简单，我们暂不处理自动切换
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
          defaultActiveKey="login" 
          items={items} 
          centered 
        />
      </Card>
    </div>
  );
};

export default Auth;