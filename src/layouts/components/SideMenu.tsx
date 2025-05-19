import { routeConfig } from '@/routes/router';
import { Menu } from 'antd';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { MenuItem, convertRoutesToMenuItems } from './MenuGenerator';

interface SideMenuProps {}

const SideMenu: React.FC<SideMenuProps> = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 动态生成菜单项
  const menuItems = useMemo(() => {
    const mainRoutes = routeConfig.find(route => route.path === '/');
    return mainRoutes?.children ? convertRoutesToMenuItems(mainRoutes.children) : [];
  }, []);
  console.log('menuItems', menuItems);

  // 处理菜单点击事件
  const handleMenuClick = ({ key }: { key: string }) => {
    console.log('key', key);
    navigate(key);
  };

  // 获取当前选中的菜单项
  const getSelectedMenuKeys = (): string[] => {
    const { pathname } = location;

    // 先尝试精确匹配
    const exactMatch = menuItems.find(item => item?.key === pathname);
    if (exactMatch) return [pathname];

    // 如果没有精确匹配，查找父级路径
    // 例如，如果当前路径是 /test/test_one，则选中 /test
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length <= 1) return [pathname]; // 一级路径直接返回

    // 构建可能的父级路径
    let parentPath = '';
    for (let i = 0; i < pathSegments.length - 1; i++) {
      parentPath += `/${pathSegments[i]}`;
      // 检查这个父级路径是否存在于菜单中
      const match = menuItems.find(item => item?.key === parentPath);
      if (match) return [parentPath];
    }

    return [pathname]; // 默认返回当前路径
  };

  return (
    <Menu
      selectedKeys={getSelectedMenuKeys()}
      mode="inline"
      items={menuItems}
      onClick={handleMenuClick}
    />
  );
};

export default SideMenu;
