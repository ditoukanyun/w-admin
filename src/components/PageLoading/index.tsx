import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.less';

interface NProgressProps {
  color?: string;
  percent: number;
  visible: boolean;
}

// 改造组件，接收外部传入的 percent 和 visible
const NProgressBar: React.FC<NProgressProps> = ({ color = '#1677ff', percent, visible }) => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .nprogress-bar { background: ${color} !important; }
      .nprogress-peg { box-shadow: 0 0 10px ${color}, 0 0 5px ${color} !important; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, [color]);

  return (
    <div
      className="nprogress-container"
      style={{
        opacity: visible ? 1 : 0,
        transition: visible ? 'none' : 'opacity 200ms linear',
      }}
    >
      <div
        className="nprogress-bar"
        style={{
          transform: `translate3d(-${100 - percent}%, 0, 0)`,
          transition: percent === 0 ? 'none' : 'all 200ms ease',
        }}
      >
        <div className="nprogress-peg" />
      </div>
    </div>
  );
};

class NProgressClass {
  private container: HTMLElement | null = null;
  private root: any = null;
  private timer: any = null;
  private _percent = 0;
  private _visible = false;
  private _color = '#1677ff';
  private _isStarted = false;

  constructor() {
    this.createContainer();
  }

  private createContainer() {
    this.container = document.getElementById('nprogress');
    if (!this.container) {
      // 只有在不存在时才创建新的容器
      this.container = document.createElement('div');
      this.container.id = 'nprogress';
      document.body.appendChild(this.container);
    }
    document.body.appendChild(this.container);
    this.root = createRoot(this.container);
    this.render();
  }

  private render() {
    // 将状态传递给组件
    this.root?.render(
      <NProgressBar color={this._color} percent={this._percent} visible={this._visible} />,
    );
  }

  private update(percent: number, visible: boolean) {
    this._percent = percent;
    this._visible = visible;
    this.render();
  }

  start() {
    // 确保在开始前重新初始化
    this.reinitialize();
    if (this._isStarted) return;
    this._isStarted = true;

    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }

    // 立即显示初始状态
    this.update(0, true);

    const startTime = performance.now();
    const initialPhaseTime = 200; // 初始快速增长阶段时间
    const targetInitialPercent = 40; // 初始阶段目标百分比

    const animate = (currentTime: number) => {
      if (!this._isStarted) return;

      const elapsed = currentTime - startTime;

      // 初始快速增长阶段
      if (elapsed < initialPhaseTime) {
        const progress = elapsed / initialPhaseTime;
        const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);
        const currentPercent = targetInitialPercent * easeOutQuad(progress);
        this.update(currentPercent, true);
        this.timer = requestAnimationFrame(animate);
        return;
      }

      // 缓慢增长阶段
      if (this._percent < 90) {
        const remaining = 90 - this._percent;
        // 使用更平滑的增量计算
        const increment = Math.pow(remaining, 0.7) * 0.04;
        this.update(this._percent + increment, true);
        this.timer = requestAnimationFrame(animate);
      }
    };

    this.timer = requestAnimationFrame(animate);
  }

  done() {
    this._isStarted = false;

    if (this.timer) {
      cancelAnimationFrame(this.timer);
      this.timer = null;
    }

    const startPercent = this._percent;
    const startTime = performance.now();
    const progressDuration = 200; // 进度动画持续时间
    const fadeOutDuration = 200; // 淡出动画持续时间

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;

      // 第一阶段：进度到 100%
      if (elapsed < progressDuration) {
        const progress = elapsed / progressDuration;
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const currentPercent = startPercent + (100 - startPercent) * easeOut(progress);
        this.update(currentPercent, true);
        requestAnimationFrame(animate);
        return;
      }

      // 第二阶段：淡出动画
      const fadeElapsed = elapsed - progressDuration;
      if (fadeElapsed < fadeOutDuration) {
        const fadeProgress = fadeElapsed / fadeOutDuration;
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        // 保持 100% 进度，只改变透明度
        this.update(100, !!(1 - easeOut(fadeProgress)));
        requestAnimationFrame(animate);
        return;
      }

      // 动画完全结束后销毁
      this.destroy();
    };

    requestAnimationFrame(animate);
  }
  // 添加销毁方法
  private destroy() {
    if (this.root) {
      this.root.unmount(); // 卸载 React 组件
      this.root = null;
    }

    if (this.container && document.body.contains(this.container)) {
      document.body.removeChild(this.container);
      this.container = null;
    }
  }

  // 添加重新初始化方法
  private reinitialize() {
    if (!this.container || !document.body.contains(this.container)) {
      this.createContainer();
    }
  }

  configure(options: { color?: string }) {
    if (options.color) {
      this._color = options.color;
      this.render();
    }
  }
}

export const NProgress = new NProgressClass();
