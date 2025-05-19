import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, useNavigate } from 'react-router';
import { getBreadcrumbByPath } from '@/routes';

const BreadcrumbNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 生成面包屑项
  const breadcrumbItems = useMemo(() => {
    return getBreadcrumbByPath(location.pathname);
  }, [location.pathname]);

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={item.path}>
          {index === breadcrumbItems.length - 1 ? (
            item.title
          ) : (
            <a onClick={() => navigate(item.path)}>{item.title}</a>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbNav; 