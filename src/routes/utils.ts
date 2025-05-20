import { routeConfig } from './router';
import { IRoute } from './types';

import type { MenuProps } from 'antd';
import React from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

// 公共递归处理函数
const traverseRoutes = <T>(
  routes: IRoute[],
  parentPath = '',
  handler: (route: IRoute, fullPath: string, children: T[] | undefined) => T,
): T[] => {
  return routes.map(route => {
    const fullPath = route.index
      ? parentPath
      : parentPath
        ? `${parentPath.replace(/\/$/, '')}/${(route.path || '').replace(/^\//, '')}`
        : `/${(route.path || '').replace(/^\//, '')}`;

    let children: T[] | undefined;
    if (route.children) {
      children = traverseRoutes(route.children, fullPath, handler);
    }

    return handler(route, fullPath, children);
  });
};

// 获取路由扁平数组
export const getRouteList = (): IRoute[] => {
  const result: IRoute[] = [];
  traverseRoutes(routeConfig, '', (route, fullPath, children) => {
    result.push({ ...route, path: fullPath });
    return null as any; // 这里只是为了遍历
  });
  return result;
};

// 转换为菜单项
export const convertRoutesToMenuItems = (routes: IRoute[] | undefined): MenuItem[] => {
  if (!routes) return [];

  const items = traverseRoutes<MenuItem | null>(routes, '', (route, fullPath, children) => {
    if (!route.name || route.hideInMenu || route.path?.includes(':')) return null;
    const path = route.index ? '/' : fullPath.startsWith('/') ? fullPath : `/${fullPath}`;
    const validChildren = children?.filter(Boolean) as MenuItem[] | undefined;
    if (validChildren && validChildren.length > 0) {
      return getItem(route.name, path, route.icon, validChildren);
    }
    return getItem(route.name, path, route.icon);
  });
  return items.filter(Boolean) as MenuItem[];
};

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
