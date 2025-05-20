import { Layout } from 'antd';
import React, { useMemo } from 'react';

import { Outlet } from 'react-router';

const { Content } = Layout;

const ContentWrapper: React.FC = () => {
  return (
    <Content style={{ margin: '0 16px' }}>
      <Outlet />
    </Content>
  );
};

export default ContentWrapper;
