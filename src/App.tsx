import TimerDisplayShowcase from './components/TimerDisplayShowcase';
import TimerWidget from './components/TimerWidget.tsx'
import './App.css';

function App() {
  let appRef: HTMLDivElement;

  return (
    <div ref={appRef!} class="app">
        <TimerWidget />
      <TimerDisplayShowcase />
    </div>
  );
}

export default App;