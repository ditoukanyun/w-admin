import { routeConfig } from './router';
import { IRoute } from './types';

// 获取路由配置的扁平数组，方便查找
export const getRouteList = (): IRoute[] => {
  const result: IRoute[] = [];

  const flattenRoutes = (routes: IRoute[], parentPath = '') => {
    routes.forEach(route => {
      // 构建完整路径
      const fullPath = route.index
        ? parentPath
        : `${parentPath}${route.path?.startsWith('/') ? route.path : `${route.path || ''}`}`;

      // 添加到结果数组
      result.push({
        ...route,
        path: fullPath,
      });

      // 递归处理子路由
      if (route.children) {
        flattenRoutes(route.children, fullPath);
      }
    });
  };

  flattenRoutes(routeConfig);
  return result;
};

// 根据路径获取路由信息
export const getRouteByPath = (path: string): IRoute | undefined => {
  const routes = getRouteList();

  return routes.find(route => route.path === path);
};

// 根据路径获取面包屑数据
export const getBreadcrumbByPath = (path: string): { title: string; path: string }[] => {
  const result: { title: string; path: string }[] = [];

  // 首页始终是第一个
  result.push({ title: '首页', path: '/' });

  if (path === '/') return result;

  // 分割路径
  const pathSegments = path.split('/').filter(Boolean);
  let currentPath = '';

  // 逐级查找路由
  for (let i = 0; i < pathSegments.length; i++) {
    currentPath += `/${pathSegments[i]}`;
    const route = getRouteByPath(currentPath);

    if (route && !route.hideInBreadcrumb) {
      result.push({
        title: route.name || pathSegments[i],
        path: currentPath,
      });
    }
  }

  return result;
};

// 获取需要保持状态的路由路径列表
export const getKeepAliveRoutes = (): string[] => {
  const routes = getRouteList();
  return routes.filter(route => route.keepAlive).map(route => route.path as string);
};
