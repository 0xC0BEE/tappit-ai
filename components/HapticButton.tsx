import * as React from 'react';
import { springTransition } from '../utils/spring.ts';

interface HapticButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  type?: 'submit' | 'button' | 'reset';
}

const HapticButton: React.FC<HapticButtonProps> = ({ children, onClick, className = '', disabled, style, type = 'button' }) => {
  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      style={style ?? springTransition}
      className={`active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default HapticButton;