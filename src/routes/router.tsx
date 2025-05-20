import Login from '@/pages/Login';

import { HomeOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import BaseLayout from '../layouts/BaseLayout';

import { IRoute } from './types';

// 路由配置
export const routeConfig: IRoute[] = [
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'home',
        lazy: async () => {
          const { default: Component } = await import('@/pages/Home');
          return { Component };
        },
        name: '首页',
        icon: <HomeOutlined />,
        meta: { title: '首页' },
      },
      {
        path: 'user',
        lazy: async () => {
          const { default: Component } = await import('@/pages/User');
          return { Component };
        },
        name: '用户',
        icon: <UserOutlined />,
        keepAlive: true,
        meta: { title: '用户管理' },
        children: [
          {
            path: 'user/:id',
            lazy: async () => {
              const { default: Component } = await import('@/pages/User/Detail');
              return { Component };
            },
            name: '用户详情',
            hideInMenu: true,
            meta: { title: '用户详情', parentPath: '/user' },
          },
        ],
      },
      {
        path: 'test',
        name: '测试',
        icon: <TeamOutlined />,
        meta: { title: '测试页面' },
        children: [
          {
            path: 'testPage',
            name: '测试',
            lazy: async () => {
              const { default: Component } = await import('@/pages/Test');
              return { Component };
            },
          },
          {
            path: 'test_one',
            lazy: async () => {
              const { default: Component } = await import('@/pages/Test/Test_One');
              return { Component };
            },
            name: '测试111',
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    Component: Login,
    name: '登录',
    hideInMenu: true,
    meta: { title: '登录' },
  },
];
