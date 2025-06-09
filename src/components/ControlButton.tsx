import { createSignal } from 'solid-js';

interface ControlButtonProps {
  onClick: () => void;
  children: any;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
}

export default function ControlButton(props: ControlButtonProps) {
  let buttonRef: HTMLButtonElement;
  const [isHovered, setIsHovered] = createSignal(false);

  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: '#3b82f6',
        color: 'white',
        hoverBackground: '#2563eb'
      },
      secondary: {
        background: '#6b7280',
        color: 'white',
        hoverBackground: '#4b5563'
      },
      success: {
        background: '#10b981',
        color: 'white',
        hoverBackground: '#059669'
      },
      warning: {
        background: '#f59e0b',
        color: 'white',
        hoverBackground: '#d97706'
      },
      danger: {
        background: '#ef4444',
        color: 'white',
        hoverBackground: '#dc2626'
      }
    };
    return variants[props.variant || 'primary'];
  };

  const handleClick = () => {
    if (props.disabled) return;

    props.onClick();
  };

  const handleMouseEnter = () => {
    if (props.disabled) return;
    
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const styles = getVariantStyles();

  return (
    <button
      ref={buttonRef!}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      disabled={props.disabled}
      style={{
        'background': isHovered() && !props.disabled ? styles.hoverBackground : styles.background,
        'color': styles.color,
        'border': 'none',
        'padding': '12px 24px',
        'border-radius': '8px',
        'font-size': '1rem',
        'font-weight': '600',
        'cursor': props.disabled ? 'not-allowed' : 'pointer',
        'transition': 'all 0.2s ease',
        'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'opacity': props.disabled ? '0.6' : '1',
        'margin': '0.5rem',
        'min-width': '100px'
      }}
    >
      {props.children}
    </button>
  );
}