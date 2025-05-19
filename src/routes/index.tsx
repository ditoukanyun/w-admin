import { createBrowserRouter } from 'react-router';
import { routeConfig } from './router';
export { getBreadcrumbByPath, getKeepAliveRoutes, getRouteByPath, getRouteList } from './utils';

// 创建 React Router 实例
export const router = createBrowserRouter(routeConfig);
