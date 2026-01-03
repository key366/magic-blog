import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

// 引入我们自定义的 Header 和 Footer
import Header from '../Header';
import FooterItem from '../FooterItem';

const { Content } = Layout;

const AppLayout = ({ user, onLogout, primaryColor, onColorChange }) => {
  // 注意：这里不再需要 useLocation 和 items 定义了，因为它们搬到 Header 里去了
  
  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      {/* 使用自定义的 Header 组件 */}
      <Header 
        user={user} 
        onLogout={onLogout} 
        primaryColor={primaryColor} 
        onColorChange={onColorChange} 
      />
      
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <div style={{ background: 'transparent', padding: 24, minHeight: 380 }}>
          {/* 
            核心概念：Outlet
            Outlet 是 react-router-dom v6 提供的一个占位符组件。
            当路由匹配到子路由时，子路由的组件就会渲染在这里。
            比如访问 /about，这里就会显示 About 组件的内容。
          */}
          <Outlet />
        </div>
      </Content>
      
      {/* 使用自定义的 Footer 组件 */}
      <FooterItem />
    </Layout>
  );
};

export default AppLayout;
