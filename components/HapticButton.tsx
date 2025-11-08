// Fix: Remove redundant triple-slash directive for React types.
import * as React from 'react';
import { springTransition } from '../utils/spring.ts';

interface HapticButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?: boolean;
  // Fix: Add style prop to allow passing custom styles from components like BottomNavBar.
  style?: React.CSSProperties;
  // Fix: Add `type` prop to allow usage within forms (e.g., type="submit").
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
      // Fix: Add `type` prop to the underlying button element to allow usage as a form submission button.
      type={type}
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