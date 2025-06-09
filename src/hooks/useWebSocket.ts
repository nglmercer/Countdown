import { createSignal, onCleanup, createEffect } from 'solid-js';

export interface TimerMessage {
  type: 'timeUpdate' | 'initialTime' | 'timerEnd' | 'status' | 'error';
  time?: number;
  message?: string;
}

export interface WebSocketAction {
  action: 'setTime' | 'addTime' | 'restTime' | 'start' | 'stop' | 'getTime';
  value?: number;
}

export function useWebSocket(timerId: string) {
  const [ws, setWs] = createSignal<WebSocket | null>(null);
  const [status, setStatus] = createSignal<string>('Connecting...');
  const [isConnected, setIsConnected] = createSignal(false);

  const connect = () => {
    const websocket = new WebSocket(`ws://localhost:3000/ws/${timerId}`);
    
    websocket.onopen = () => {
      setStatus(`Connected to Timer ${timerId}`);
      setIsConnected(true);
      console.log(`WebSocket connected to timer: ${timerId}`);
    };

    websocket.onclose = () => {
      setStatus('Connection closed. Reconnecting...');
      setIsConnected(false);
      console.log('WebSocket connection closed');
      
      // Auto-reconnect after 3 seconds
      setTimeout(() => {
        if (!isConnected()) {
          connect();
        }
      }, 3000);
    };

    websocket.onerror = (error) => {
      setStatus('Connection error. Check console.');
      setIsConnected(false);
      console.error('WebSocket error:', error);
    };

    setWs(websocket);
  };

  const sendMessage = (message: WebSocketAction) => {
    const websocket = ws();
    if (websocket && websocket.readyState === WebSocket.OPEN) {
      websocket.send(JSON.stringify(message));
    } else {
      setStatus('Not connected. Please wait...');
    }
  };

  const onMessage = (callback: (data: TimerMessage) => void) => {
    createEffect(() => {
      const websocket = ws();
      if (websocket) {
        websocket.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as TimerMessage;
            callback(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
            setStatus('Error processing server message');
          }
        };
      }
    });
  };

  // Initialize connection
  connect();

  // Cleanup on component unmount
  onCleanup(() => {
    const websocket = ws();
    if (websocket) {
      websocket.close();
    }
  });

  return {
    sendMessage,
    onMessage,
    status,
    isConnected
  };
}