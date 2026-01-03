import React from 'react';
import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const FooterItem = () => {
  return (
    <AntFooter style={{ textAlign: 'center', background: 'transparent' }}>
      My Blog ©{new Date().getFullYear()} Created with React & Ant Design
    </AntFooter>
  );
};

export default FooterItem;