import {
  DesktopOutlined,
  FileOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import Login from '../pages/Login';
import { withLazyLoad } from './lazyLoad';
import { IRoute } from './types';

// 路由配置
export const routeConfig: IRoute[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'home',
        element: withLazyLoad(() => import('@/pages/Home')),
        name: '首页',
        icon: <HomeOutlined />,
        meta: { title: '首页' },
      },
      {
        path: 'user',
        element: withLazyLoad(() => import('@/pages/User')),
        name: '用户',
        icon: <UserOutlined />,
        keepAlive: true,
        meta: { title: '用户管理' },
        children: [
          {
            path: 'user/:id',
            element: withLazyLoad(() => import('@/pages/User/Detail')),
            name: '用户详情',
            hideInMenu: true,
            meta: { title: '用户详情', parentPath: '/user' },
          },
          {
            path: 'user/new',
            element: withLazyLoad(() => import('@/pages/User/Detail')),
            name: '新增用户',
            hideInMenu: true,
            meta: { title: '新增用户', parentPath: '/user' },
          },
        ],
      },
      {
        path: 'test',
        element: withLazyLoad(() => import('@/pages/Test')),
        name: '测试',
        icon: <TeamOutlined />,
        meta: { title: '测试页面' },
      },
      {
        path: 'test/test_one',
        element: withLazyLoad(() => import('@/pages/Test/Test_One')),
        name: '测试1',
        hideInMenu: true,
        meta: { title: '测试页面1', parentPath: '/test' },
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    name: '登录',
    hideInMenu: true,
    meta: { title: '登录' },
  },
];
