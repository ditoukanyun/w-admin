import KeepAlive from '@/components/KeepAlive';
import { getKeepAliveRoutes } from '@/routes';
import { Layout } from 'antd';
import React, { useMemo } from 'react';
import { Outlet } from 'react-router';
import BreadcrumbNav from './BreadcrumbNav';

const { Content } = Layout;

const ContentWrapper: React.FC = () => {
  // 获取需要缓存的路由路径
  const keepAlivePaths = useMemo(() => getKeepAliveRoutes(), []);

  return (
    <Content style={{ margin: '0 16px' }}>
      {/* <BreadcrumbNav />
      <KeepAlive include={keepAlivePaths}>
      </KeepAlive> */}
      <Outlet />
    </Content>
  );
};

export default ContentWrapper;
