import { RouteObject } from 'react-router';

// 使用交叉类型，兼容 v7
export type IRoute = RouteObject & {
  name?: string; // 路由名称，用于菜单显示
  icon?: React.ReactNode; // 图标名称，用于菜单显示
  hideInMenu?: boolean; // 是否在菜单中隐藏
  hideInBreadcrumb?: boolean; // 是否在面包屑中隐藏
  keepAlive?: boolean; // 是否保持组件状态
  meta?: {
    // 其他元数据
    title?: string; // 页面标题
    permission?: string; // 权限标识
    parentPath?: string; // 父级路径
    [key: string]: any;
  };
  children?: IRoute[];
};
