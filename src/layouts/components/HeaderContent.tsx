import React from 'react';
import { Button, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import TabsView from '@/components/TabsView';

interface HeaderContentProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ collapsed, toggleCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div
      style={{
        padding: 0,
        background: colorBgContainer,
        height: '50px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={toggleCollapsed}
        style={{
          fontSize: '16px',
          width: 40,
          height: 40,
        }}
      />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <TabsView />
      </div>
    </div>
  );
};

export default HeaderContent; 