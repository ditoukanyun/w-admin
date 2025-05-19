import { getRouteByPath } from '@/routes';
import type { MenuProps } from 'antd';
import { Dropdown, Tabs } from 'antd';
import { TabsProps } from 'antd/lib/tabs';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  closable?: boolean;
  parentPath?: string;
  originalTitle?: string; // 保存原始标题，用于显示
}

const TabsView: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>('');
  const [items, setItems] = useState<TabItem[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [contextMenuTab, setContextMenuTab] = useState<string | null>(null);

  // 获取路由名称
  const getRouteTitle = (path: string): string => {
    const route = getRouteByPath(path);
    if (!route) return '未知页面';

    // 处理动态路由名称
    if (route.path?.includes(':') && route.meta?.parentPath) {
      const pathSegments = path.split('/');
      const id = pathSegments[pathSegments.length - 1];

      if (id === 'new') {
        return '新增用户';
      } else {
        return `${route.name || '详情'} ${id}`;
      }
    }

    return route.name || route.meta?.title || path.split('/').pop() || '首页';
  };

  // 根据路由更新标签页
  useEffect(() => {
    const { pathname } = location;

    addTab(pathname);
    setActiveKey(pathname);
  }, [location]);

  // 添加标签页
  const addTab = (path: string) => {
    console.log('items', items);
    const exist = items.find(item => item.key === path);
    if (!exist) {
      // 获取路由信息
      const route = getRouteByPath(path);
      console.log('route', route);

      // 处理动态路由
      let tabTitle = getRouteTitle(path);
      console.log('tabTitle', tabTitle);
      let parentPath = '';

      if (route?.meta?.parentPath) {
        parentPath = route.meta.parentPath;
      }

      // 创建带有右键菜单的标签
      const tabLabel = (
        <Dropdown
          menu={{ items: getContextMenu(path) }}
          trigger={['contextMenu']}
          onOpenChange={open => {
            if (open) setContextMenuTab(path);
          }}
        >
          <span>{tabTitle}</span>
        </Dropdown>
      );

      setItems(prev => [
        ...prev,
        {
          key: path,
          label: tabLabel,
          originalTitle: tabTitle, // 保存原始标题
          closable: path !== '/',
          parentPath,
        },
      ]);
    }
  };

  // // 更新当前标签的标题
  // useEffect(() => {
  //   // 为确保路径和标题匹配，在路由变化时更新
  //   const updateTabTitles = () => {
  //     const newItems = items.map(item => {
  //       const tabTitle = getRouteTitle(item.key);

  //       // 创建带有右键菜单的标签
  //       const tabLabel = (
  //         <Dropdown
  //           menu={{ items: getContextMenu(item.key) }}
  //           trigger={['contextMenu']}
  //           onOpenChange={open => {
  //             if (open) setContextMenuTab(item.key);
  //           }}
  //         >
  //           <span>{tabTitle}</span>
  //         </Dropdown>
  //       );

  //       return {
  //         ...item,
  //         label: tabLabel,
  //         originalTitle: tabTitle,
  //       };
  //     });

  //     setItems(newItems);
  //   };

  //   updateTabTitles();
  // }, [location.pathname]);

  // 获取右键菜单项
  const getContextMenu = (tabKey: string): MenuProps['items'] => {
    return [
      {
        key: 'refresh',
        label: '刷新页面',
        onClick: () => handleRefreshTab(tabKey),
      },
      {
        key: 'close',
        label: '关闭标签页',
        disabled: tabKey === '/',
        onClick: () => handleCloseTab(tabKey),
      },
      {
        key: 'closeOthers',
        label: '关闭其他标签页',
        onClick: () => handleCloseOtherTabs(tabKey),
      },
      {
        key: 'closeAll',
        label: '关闭所有标签页',
        onClick: () => handleCloseAllTabs(),
      },
    ];
  };

  // 刷新标签页
  const handleRefreshTab = (key: string) => {
    // 实现页面刷新逻辑
    navigate(key);
  };

  // 关闭标签页
  const handleCloseTab = (targetKey: string) => {
    if (targetKey === '/') return; // 不关闭首页

    const targetItem = items.find(item => item.key === targetKey);
    const newItems = items.filter(item => item.key !== targetKey);
    setItems(newItems);

    // 如果关闭的是当前激活的标签，则切换到最后一个标签
    if (targetKey === activeKey) {
      // 如果有父路径，优先导航到父路径
      if (targetItem?.parentPath) {
        const parentTab = newItems.find(item => item.key === targetItem.parentPath);
        if (parentTab) {
          setActiveKey(parentTab.key);
          navigate(parentTab.key);
          return;
        }
      }

      const lastTab = newItems[newItems.length - 1];
      if (lastTab) {
        setActiveKey(lastTab.key);
        navigate(lastTab.key);
      }
    }
  };

  // 关闭其他标签页
  const handleCloseOtherTabs = (currentKey: string) => {
    const currentTab = items.find(item => item.key === currentKey);
    if (currentTab) {
      // 保留首页和当前页
      const newItems = items.filter(item => item.key === '/' || item.key === currentKey);
      setItems(newItems);
      setActiveKey(currentKey);
      navigate(currentKey);
    }
  };

  // 关闭所有标签页
  const handleCloseAllTabs = () => {
    // 只保留首页
    const homeTab = items.find(item => item.key === '/');
    if (homeTab) {
      setItems([homeTab]);
      setActiveKey('/');
      navigate('/');
    }
  };

  // 切换标签页
  const onChange = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  // 关闭标签页
  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove' && typeof targetKey === 'string') {
      handleCloseTab(targetKey);
    }
  };

  return (
    <Tabs
      hideAdd
      onChange={onChange}
      activeKey={activeKey}
      type="editable-card"
      onEdit={onEdit}
      items={items}
      style={{ marginRight: '16px' }}
    />
  );
};

export default TabsView;
