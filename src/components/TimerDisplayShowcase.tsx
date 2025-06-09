import { createSignal } from 'solid-js';
import { useWebSocket } from '../hooks/useWebSocket';
import { getTimerIdFromQuery } from '../utils/urlParams';
import SimpleTimerDisplay from './SimpleTimerDisplay';

export default function TimerDisplayShowcase() {
  const [currentTime, setCurrentTime] = createSignal(0);
  const [timerId] = createSignal(getTimerIdFromQuery());
  
  const { onMessage } = useWebSocket(timerId());

  // Handle WebSocket messages
  onMessage((data) => {
    switch (data.type) {
      case 'timeUpdate':
      case 'initialTime':
        if (typeof data.time === 'number') {
          setCurrentTime(data.time);
        }
        break;
      case 'timerEnd':
        setCurrentTime(0);
        break;
    }
  });

  return (
    
    <div style={{
      'display': 'grid',
      'max-width': '1200px',
      'margin': '0 auto',
      'padding': '1rem',
      'gap': '10px'
    }}>
      
      {/* Exact Format - Full Width */}
      <div style={{
        'background': 'white',
        'border-radius': '12px',
        'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'padding': '1rem',
        'margin-top': '1rem'
      }}>
        <SimpleTimerDisplay time={currentTime} format="exact" showLabels={true} />
      </div>
      <div style={{
        'display': 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(400px, 1fr))',
        'gap': '2rem',
        'margin-bottom': '2rem'
      }}>
        {/* Days */}
        <div style={{
          'background': 'white',
          'border-radius': '12px',
          'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
          'padding': '1.5rem'
        }}>
          <h3 style={{ 'text-align': 'center', 'margin-bottom': '1rem', 'color': '#374151' }}>
            Days
          </h3>
          <SimpleTimerDisplay time={currentTime} format="days" showLabels={true} />
        </div>
        {/* Hours */}
        <div style={{
          'background': 'white',
          'border-radius': '12px',
          'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
          'padding': '1.5rem'
        }}>
          <h3 style={{ 'text-align': 'center', 'margin-bottom': '1rem', 'color': '#374151' }}>
            Hours
          </h3>
          <SimpleTimerDisplay time={currentTime} format="hours" showLabels={true} />
        </div>
        {/* Minutes */}
        <div style={{
          'background': 'white',
          'border-radius': '12px',
          'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
          'padding': '1.5rem'
        }}>
          <h3 style={{ 'text-align': 'center', 'margin-bottom': '1rem', 'color': '#374151' }}>
            Minutes
          </h3>
          <SimpleTimerDisplay time={currentTime} format="minutes" showLabels={true} />
        </div>

        {/* Seconds */}
        <div style={{
          'background': 'white',
          'border-radius': '12px',
          'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
          'padding': '1.5rem'
        }}>
          <h3 style={{ 'text-align': 'center', 'margin-bottom': '1rem', 'color': '#374151' }}>
            Seconds
          </h3>
          <SimpleTimerDisplay time={currentTime} format="seconds" showLabels={true} />
        </div>





      </div>

      <div style={{
        'text-align': 'center',
        'margin-top': '2rem',
        'color': '#6b7280',
        'font-size': '0.9rem'
      }}>
        Timer ID: <strong>{timerId()}</strong> | Current Time: {currentTime()} seconds
      </div>
    </div>
  );
}