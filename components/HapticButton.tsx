
import React, { ReactNode, MouseEventHandler } from 'react';

interface HapticButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
}

const HapticButton: React.FC<HapticButtonProps> = ({ children, onClick, className = '', disabled }) => {
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
      className={`transition-transform duration-150 ease-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default HapticButton;
