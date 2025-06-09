import { createSignal } from 'solid-js';

interface TimeInputProps {
  onSetTime: (seconds: number) => void;
}

export default function TimeInput(props: TimeInputProps) {
  const [inputValue, setInputValue] = createSignal('');
  let inputRef: HTMLInputElement;
  let containerRef: HTMLDivElement;

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    const seconds = parseInt(inputValue());
    
    if (!isNaN(seconds) && seconds >= 0) {
      props.onSetTime(seconds);
      setInputValue('');
      
    } 
  };

  return (
    <div ref={containerRef!} style={{ 'margin': '1rem 0' }}>
      <form onSubmit={handleSubmit} style={{ 'display': 'flex', 'gap': '0.5rem', 'justify-content': 'center' }}>
        <input
          ref={inputRef!}
          type="number"
          value={inputValue()}
          onInput={(e) => setInputValue(e.currentTarget.value)}
          placeholder="Enter seconds"
          min="0"
          style={{
            'padding': '12px 16px',
            'border': '2px solid #e5e7eb',
            'border-radius': '8px',
            'font-size': '1rem',
            'outline': 'none',
            'transition': 'all 0.2s ease',
            'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.1)',
            'min-width': '200px'
          }}
        />
        <button
          type="submit"
          style={{
            'background': '#3b82f6',
            'color': 'white',
            'border': 'none',
            'padding': '12px 24px',
            'border-radius': '8px',
            'font-size': '1rem',
            'font-weight': '600',
            'cursor': 'pointer',
            'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.15)',
            'transition': 'all 0.2s ease'
          }}
        >
          Set Time
        </button>
      </form>
    </div>
  );
}