import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

interface KeepAliveProps {
  include?: string[];
  children: React.ReactNode;
}

interface CacheItem {
  component: React.ReactNode;
  dom: HTMLDivElement | null;
}

const KeepAlive: React.FC<KeepAliveProps> = ({ include = [], children }) => {
  const componentCache = useRef<Map<string, CacheItem>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    
    // 如果当前路径需要被缓存
    if (include.includes(currentPath)) {
      if (!componentCache.current.has(currentPath)) {
        // 创建新的缓存项
        const div = document.createElement('div');
        div.setAttribute('data-path', currentPath);
        componentCache.current.set(currentPath, {
          component: children,
          dom: div
        });
      }

      // 显示当前路径对应的组件
      const currentCache = componentCache.current.get(currentPath);
      if (currentCache && containerRef.current) {
        containerRef.current.innerHTML = '';
        if (currentCache.dom) {
          containerRef.current.appendChild(currentCache.dom);
        }
      }
    } else {
      // 不需要缓存的路径直接显示
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    }
  }, [location.pathname, children, include]);

  return <div ref={containerRef}>{!include.includes(location.pathname) && children}</div>;
};

export default KeepAlive; 