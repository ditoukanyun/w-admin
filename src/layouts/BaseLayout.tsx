import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  SideMenu,
  HeaderContent,
  ContentWrapper,
  FooterContent
} from './components';

const { Sider, Header } = Layout;

const BaseLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  // 切换侧边栏折叠状态
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        collapsedWidth={50}
        width={256}
        style={{ backgroundColor: '#fff' }}
        trigger={null}
      >
        <SideMenu  />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, height: 'auto' }}>
          <HeaderContent collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
        </Header>
        <ContentWrapper />
        <FooterContent />
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
