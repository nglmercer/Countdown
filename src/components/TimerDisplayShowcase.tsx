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
      'max-width': '1200px',
      'margin': '0 auto',
      'padding': '2rem',
      'background': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      'min-height': '100vh'
    }}>
      <h1 style={{
        'text-align': 'center',
        'margin-bottom': '3rem',
        'font-size': '2.5rem',
        'color': '#1f2937'
      }}>
        Timer Display Formats
      </h1>

      <div style={{
        'display': 'grid',
        'grid-template-columns': 'repeat(auto-fit, minmax(400px, 1fr))',
        'gap': '2rem',
        'margin-bottom': '2rem'
      }}>
        {/* Auto Format */}
        <div style={{
          'background': 'white',
          'border-radius': '12px',
          'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
          'padding': '1.5rem'
        }}>
          <h3 style={{ 'text-align': 'center', 'margin-bottom': '1rem', 'color': '#374151' }}>
            Auto Format
          </h3>
          <SimpleTimerDisplay time={currentTime} format="auto" showLabels={true} />
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
      </div>

      {/* Exact Format - Full Width */}
      <div style={{
        'background': 'white',
        'border-radius': '12px',
        'box-shadow': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'padding': '2rem',
        'margin-top': '2rem'
      }}>
        <h3 style={{ 'text-align': 'center', 'margin-bottom': '2rem', 'color': '#374151' }}>
          Exact Format (Days:Hours:Minutes:Seconds)
        </h3>
        <SimpleTimerDisplay time={currentTime} format="exact" showLabels={true} />
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