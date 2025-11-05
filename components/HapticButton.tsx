
import React, { ReactNode, MouseEventHandler } from 'react';
import { springTransition } from '../utils/spring.ts';

interface HapticButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  // Fix: Add style prop to allow passing custom styles from components like BottomNavBar.
  style?: React.CSSProperties;
}

const HapticButton: React.FC<HapticButtonProps> = ({ children, onClick, className = '', disabled, style }) => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      // Fix: Use the passed style prop, falling back to the original springTransition if none is provided.
      style={style ?? springTransition}
      className={`active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default HapticButton;
