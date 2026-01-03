import React, { useState } from 'react';
import { Layout, Menu, ColorPicker, Space, Avatar, Dropdown, Button, Drawer, Grid } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, LogoutOutlined, DownOutlined, MenuOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout; // 重命名一下，避免冲突
const { useBreakpoint } = Grid;

const Header = ({ user, onLogout, primaryColor, onColorChange }) => {
  const location = useLocation();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const items = [
    {
      key: '/',
      label: <Link to="/" onClick={() => setDrawerVisible(false)}>首页</Link>,
    },
    {
      key: '/archive',
      label: <Link to="/archive" onClick={() => setDrawerVisible(false)}>记忆回廊</Link>,
    },
    {
      key: '/about',
      label: <Link to="/about" onClick={() => setDrawerVisible(false)}>法师塔</Link>,
    },
    {
      key: '/write',
      label: <Link to="/write" onClick={() => setDrawerVisible(false)}>刻录卷轴</Link>,
    },
  ];

  // 移动端抽屉菜单内容
  const mobileMenu = (
    <Menu
      theme="dark"
      mode="vertical"
      selectedKeys={[location.pathname]}
      items={items}
      style={{ background: 'transparent', border: 'none' }}
    />
  );

  return (
    <AntHeader style={{ display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: '#ffd700', fontSize: screens.md ? '1.8rem' : '1.2rem', fontWeight: 'bold', marginRight: screens.md ? '2rem' : '1rem', fontFamily: "'VT323', monospace", textShadow: '2px 2px #000', whiteSpace: 'nowrap' }}>
          见习魔法师的手记
        </div>
        
        {/* 桌面端菜单 */}
        {screens.md && (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={items}
            style={{ minWidth: 400, borderBottom: 'none' }}
          />
        )}
      </div>

      {/* 右侧功能区 */}
      <Space size={screens.md ? "large" : "small"}>
        {/* 主题色选择器 */}
        <Space>
          {screens.md && <span style={{ color: '#e0e0e0', fontFamily: "'VT323', monospace", fontSize: '1.2rem' }}>魔力色相:</span>}
          <ColorPicker 
            value={primaryColor} 
            onChange={(value) => onColorChange(value.toHexString())} 
            presets={[
              {
                label: '元素预设',
                colors: [
                  '#ffd700', // 金色 (光)
                  '#b366ff', // 紫色 (虚空)
                  '#4d94ff', // 蓝色 (冰/水)
                  '#ff5c5c', // 红色 (火)
                  '#5cd65c', // 绿色 (自然)
                  '#cd853f', // 铜色 (土)
                ],
              },
            ]}
          />
        </Space>

        {/* 用户信息区域 (如果有 user) */}
        {user ? (
          <Dropdown 
            menu={{
              items: [
                {
                  key: 'logout',
                  label: '退出登录',
                  icon: <LogoutOutlined />,
                  onClick: onLogout
                }
              ]
            }}
          >
            <Space style={{ cursor: 'pointer', color: primaryColor }}>
              <Avatar src={user.avatar} icon={<UserOutlined />} style={{ border: `2px solid ${primaryColor}` }} />
              {screens.md && <span style={{ fontFamily: "'VT323', monospace", fontSize: '1.2rem' }}>{user.username}</span>}
              <DownOutlined />
            </Space>
          </Dropdown>
        ) : (
          <Link to="/auth">
            <Button type="primary" ghost size={screens.md ? 'middle' : 'small'}>
              {screens.md ? '登录 / 注册' : '登录'}
            </Button>
          </Link>
        )}

        {/* 移动端菜单按钮 */}
        {!screens.md && (
          <Button 
            type="text" 
            icon={<MenuOutlined style={{ color: '#ffd700', fontSize: '1.5rem' }} />} 
            onClick={() => setDrawerVisible(true)}
          />
        )}
      </Space>

      {/* 移动端抽屉 */}
      <Drawer
        title={<span style={{ color: '#ffd700', fontFamily: "'VT323', monospace" }}>导航卷轴</span>}
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{ body: { padding: 0, backgroundColor: '#1a1a20' }, header: { backgroundColor: '#1a1a20', borderBottom: '1px solid #333' } }}
        width={250}
      >
        {mobileMenu}
      </Drawer>
    </AntHeader>
  );
};

export default Header;