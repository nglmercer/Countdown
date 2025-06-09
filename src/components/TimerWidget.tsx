import { createSignal } from 'solid-js';
import { useWebSocket } from '../hooks/useWebSocket';
import { getTimerIdFromQuery } from '../utils/urlParams';
import TimerDisplay from './TimerDisplay';
import ControlButton from './ControlButton';
import StatusIndicator from './StatusIndicator';
import TimeInput from './TimeInput';

export default function TimerWidget() {
  const [currentTime, setCurrentTime] = createSignal(0);
  const [timerId] = createSignal(getTimerIdFromQuery());
  
  let containerRef: HTMLDivElement;

  const { sendMessage, onMessage, status, isConnected } = useWebSocket(timerId());



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
        // Timer end animation
        break;
      case 'status':
        console.log('Status update:', data.message);
        break;
      case 'error':
        console.error('Timer error:', data.message);
        break;
    }
  });

  const handleSetTime = (seconds: number) => {
    sendMessage({ action: 'setTime', value: seconds });
  };

  const handleAddTime = () => {
    sendMessage({ action: 'addTime', value: 5 });
  };

  const handleSubtractTime = () => {
    sendMessage({ action: 'restTime', value: 5 });
  };

  const handleStart = () => {
    sendMessage({ action: 'start' });
  };

  const handleStop = () => {
    sendMessage({ action: 'stop' });
  };

  const handleGetTime = () => {
    sendMessage({ action: 'getTime' });
  };

  return (
    <div 
      ref={containerRef!}
      style={{
        'max-width': '600px',
        'margin': '0 auto',
        'padding': '2rem',
        'background': 'rgba(255, 255, 255, 0.1)',
        'border-radius': '16px',
        'backdrop-filter': 'blur(20px)',
        'border': '1px solid rgba(255, 255, 255, 0.2)',
        'box-shadow': '0 20px 40px rgba(0, 0, 0, 0.1)'
      }}
    >
      <h1 style={{
        'text-align': 'center',
        'margin-bottom': '2rem',
        'font-size': '2.5rem',
        'font-weight': 'bold',
        'color': '#1f2937',
        'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        Timer Widget
      </h1>
      
      <div style={{ 'text-align': 'center', 'margin-bottom': '1rem', 'color': '#6b7280' }}>
        Timer ID: <strong style={{ 'color': '#3b82f6' }}>{timerId()}</strong>
      </div>

      <TimerDisplay time={currentTime} />
      
      <StatusIndicator status={status} isConnected={isConnected} />
      
      <TimeInput onSetTime={handleSetTime} />
      
      <div style={{
        'display': 'flex',
        'flex-wrap': 'wrap',
        'justify-content': 'center',
        'gap': '0.5rem',
        'margin-top': '1.5rem'
      }}>
        <ControlButton onClick={handleAddTime} variant="success">
          +5s
        </ControlButton>
        
        <ControlButton onClick={handleSubtractTime} variant="warning">
          -5s
        </ControlButton>
        
        <ControlButton onClick={handleStart} variant="primary">
          Start
        </ControlButton>
        
        <ControlButton onClick={handleStop} variant="danger">
          Stop
        </ControlButton>
        
        <ControlButton onClick={handleGetTime} variant="secondary">
          Get Time
        </ControlButton>
      </div>
    </div>
  );
}