import React, { useMemo } from 'react';
import './index.css';

const BackgroundEffects = () => {
  // 生成随机粒子
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => {
      const size = Math.random() * 4 + 2; // 2-6px
      const left = Math.random() * 100; // 0-100%
      const top = Math.random() * 100; // 0-100%
      const duration = Math.random() * 3 + 2; // 2-5s
      const delay = Math.random() * 5; // 0-5s
      
      // 随机颜色：金、紫、蓝
      const colors = ['#ffd700', '#b366ff', '#4d94ff'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return (
        <div
          key={`particle-${i}`}
          className="magic-particle"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            top: `${top}%`,
            backgroundColor: color,
            boxShadow: `0 0 ${size * 2}px ${color}`,
            animationDuration: `${duration}s, ${duration * 1.5}s`, // float 和 fade 不同步
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
  }, []);

  // 生成随机魔法阵
  const runes = useMemo(() => {
    return Array.from({ length: 5 }).map((_, i) => {
      const size = Math.random() * 100 + 100; // 100-200px
      const left = Math.random() * 90; // 0-90%
      const top = Math.random() * 90; // 0-90%
      const duration = Math.random() * 10 + 10; // 10-20s
      const delay = Math.random() * 10; // 0-10s

      return (
        <div
          key={`rune-${i}`}
          className="magic-rune"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            top: `${top}%`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
          }}
        />
      );
    });
  }, []);

  return (
    <div className="background-effects-container">
      {particles}
      {runes}
    </div>
  );
};

export default BackgroundEffects;
