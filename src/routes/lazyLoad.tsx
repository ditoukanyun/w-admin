import React, { lazy, Suspense, useEffect } from 'react';

// 加载状态组件
const LoadingFallback = () => {
  // useEffect(() => {
  //   NProgress.start();
  //   return () => {
  //     NProgress.done();
  //   };
  // }, []);
  return <div style={{ padding: 24, textAlign: 'center' }}>页面加载中...</div>;
};

// 错误边界组件
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  // static getDerivedStateFromError() {
  //   return { hasError: true };
  // }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('页面加载错误:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <h2>页面加载失败</h2>
          <button onClick={() => this.setState({ hasError: false })}>重试</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export const withLazyLoad = (lazyFunc: () => Promise<{ default: React.ComponentType<any> }>) => {
  const LazyComponent = lazy(async () => {
    try {
      const component = await lazyFunc();
      return component;
    } catch (error) {
      console.error('组件加载失败:', error);
      throw error;
    }
  });

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <LazyComponent />
      </Suspense>
    </ErrorBoundary>
  );
};
