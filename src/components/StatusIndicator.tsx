interface StatusIndicatorProps {
  status: () => string;
  isConnected: () => boolean;
}

export default function StatusIndicator(props: StatusIndicatorProps) {
  let statusRef: HTMLDivElement;
  let indicatorRef: HTMLDivElement;

  return (
    <div 
      ref={statusRef!}
      style={{
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'gap': '0.5rem',
        'margin': '1rem 0',
        'padding': '0.75rem 1rem',
        'background': 'rgba(255, 255, 255, 0.1)',
        'border-radius': '8px',
        'backdrop-filter': 'blur(10px)',
        'border': '1px solid rgba(255, 255, 255, 0.2)'
      }}
    >
      <div
        ref={indicatorRef!}
        style={{
          'width': '12px',
          'height': '12px',
          'border-radius': '50%',
          'background': props.isConnected() ? '#10b981' : '#ef4444',
          'box-shadow': props.isConnected() 
            ? '0 0 10px rgba(16, 185, 129, 0.5)' 
            : '0 0 10px rgba(239, 68, 68, 0.5)'
        }}
      />
      <span style={{ 'font-size': '0.9rem', 'color': '#374151' }}>
        {props.status()}
      </span>
    </div>
  );
}