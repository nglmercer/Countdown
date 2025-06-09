import { createEffect } from 'solid-js';
import { formatTime } from '../utils/timeFormatter';

interface TimerDisplayProps {
  time: () => number;
}

export default function TimerDisplay(props: TimerDisplayProps) {
  let displayRef: HTMLDivElement;
  let prevTime = 0;


  createEffect(() => {
    const currentTime = props.time();
    prevTime = currentTime;
  });

  return (
    <div 
      ref={displayRef!}
      class="timer-display"
      style={{
        'font-size': '4rem',
        'font-weight': 'bold',
        'font-family': 'monospace',
        'text-align': 'center',
        'margin': '2rem 0',
        'padding': '1rem',
        'background': 'rgba(0, 0, 0, 0.28)',
        'border-radius': '12px',
        'backdrop-filter': 'blur(10px)',
        'border': '1px solid rgba(255, 255, 255, 0.2)',
        'box-shadow': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'min-height': '120px',
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center'
      }}
    >
      {formatTime(props.time())}
    </div>
  );
}