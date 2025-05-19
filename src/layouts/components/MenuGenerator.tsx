import { IRoute } from '@/routes/types';
import type { MenuProps } from 'antd';
import React from 'react';

export type MenuItem = Required<MenuProps>['items'][number];

// 将路由配置转换为菜单项
export const convertRoutesToMenuItems = (routes: IRoute[] | undefined): MenuItem[] => {
  if (!routes) return [];

  return routes
    .filter(route => route.name && !route.hideInMenu && !route.path?.includes(':')) // 过滤掉没有名称的路由、隐藏的路由和动态路由
    .map(route => {
      // 确定路由路径
      const path = route.index ? '/' : `/${route.path}`;

      // 如果有子路由，递归处理
      if (route.children && route.children.length > 0) {
        const childrenItems: MenuItem[] = convertRoutesToMenuItems(route.children)
          .map((child: MenuItem) => {
            // 子路由的完整路径需要包含父路由路径
            if (child && child.key && typeof child.key === 'string') {
              return {
                ...child,
                key: `${path}/${child.key.replace(/^\//, '')}`,
              };
            }
            return child;
          })
          .filter((item): item is MenuItem => item !== null);

        // 如果没有可显示的子项，则不显示子菜单
        if (childrenItems.length === 0) {
          return getItem(route.name, path, route.icon);
        }

        return getItem(route.name, path, route.icon, childrenItems);
      }

      return getItem(route.name, path, route.icon);
    });
};

export function getItem(
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
