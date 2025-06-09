import { createSignal, createEffect, createMemo } from 'solid-js';
import AnimatedNumber from './AnimatedNumber';

interface SimpleTimerDisplayProps {
  time: () => number | number;
  format?: 'auto' | 'seconds' | 'minutes' | 'hours' | 'days' | 'exact';
  showLabels?: boolean;
}

export default function SimpleTimerDisplay(props: SimpleTimerDisplayProps) {
  const [displayTime, setDisplayTime] = createSignal(props.time());

  createEffect(() => {
    setDisplayTime(props.time());
  });

  // Memoizar los valores calculados para evitar recálculos innecesarios
  const exactTimeValues = createMemo(() => {
    const totalSeconds = displayTime();
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return { days, hours, minutes, seconds };
  });

  const autoTimeValue = createMemo(() => {
    const totalSeconds = displayTime();
    
    if (totalSeconds < 60) {
      return {
        value: totalSeconds,
        unit: 's',
        label: totalSeconds === 1 ? 'second' : 'seconds',
        decimals: 0
      };
    } else if (totalSeconds < 3600) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return {
        value: minutes + (seconds / 60),
        unit: 'm',
        label: 'minutes',
        decimals: seconds > 0 ? 1 : 0
      };
    } else if (totalSeconds < 86400) {
      const hours = Math.floor(totalSeconds / 3600);
      const remainingMinutes = Math.floor((totalSeconds % 3600) / 60);
      return {
        value: hours + (remainingMinutes / 60),
        unit: 'h',
        label: 'hours',
        decimals: remainingMinutes > 0 ? 1 : 0
      };
    } else {
      const days = Math.floor(totalSeconds / 86400);
      const remainingHours = Math.floor((totalSeconds % 86400) / 3600);
      return {
        value: days + (remainingHours / 24),
        unit: 'd',
        label: 'days',
        decimals: remainingHours > 0 ? 1 : 0
      };
    }
  });
  const formattedDisplay = createMemo(() => {
    const time = displayTime();
    // Usamos props.format aquí para que el memo reaccione si la prop cambia
    const format = props.format || 'auto';

    switch (format) {
      case 'seconds':
        return { value: time, unit: 's', label: time === 1 ? 'second' : 'seconds', decimals: 0 };
      
      case 'minutes':
        return { value: time / 60, unit: 'm', label: 'minutes', decimals: 2 };
      
      case 'hours':
        return { value: time / 3600, unit: 'h', label: 'hours', decimals: 2 };
      
      case 'days':
        return { value: time / 86400, unit: 'd', label: 'days', decimals: 3 };
      
      // El caso 'exact' no es usado por renderStandardFormat, pero lo dejamos por consistencia.
      // En la práctica, 'auto' es el que se usará en el caso por defecto.
      case 'exact':
        return { value: time, unit: '', label: '', decimals: 0 };
        
      default: // 'auto'
        return autoTimeValue();
    }
  });
  const renderExactFormat = () => {
    
    return (
      <div style={{
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'gap': '0.5rem',
        'font-family': 'monospace',
        'font-size': '3rem',
        'font-weight': 'bold'
      }}>
        <div style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
          <AnimatedNumber 
            // Accedemos a la propiedad del memo directamente dentro de la función
            value={() => exactTimeValues().days} 
            duration={0.4}
            style={{ 'font-size': '3rem', 'line-height': '1' }}
          />
          {props.showLabels && (
            <span style={{ 'font-size': '0.8rem', 'opacity': '0.7' }}>days</span>
          )}
        </div>
        <span style={{ 'opacity': '0.5' }}>:</span>
        
        <div style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
          <AnimatedNumber 
            value={() => exactTimeValues().hours} 
            duration={0.4}
            style={{ 'font-size': '3rem', 'line-height': '1' }}
          />
          {props.showLabels && (
            <span style={{ 'font-size': '0.8rem', 'opacity': '0.7' }}>hours</span>
          )}
        </div>
        <span style={{ 'opacity': '0.5' }}>:</span>
        
        <div style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
          <AnimatedNumber 
            value={() => exactTimeValues().minutes} 
            duration={0.4}
            style={{ 'font-size': '3rem', 'line-height': '1' }}
          />
          {props.showLabels && (
            <span style={{ 'font-size': '0.8rem', 'opacity': '0.7' }}>min</span>
          )}
        </div>
        <span style={{ 'opacity': '0.5' }}>:</span>
        
        <div style={{ 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
          <AnimatedNumber 
            value={() => exactTimeValues().seconds} 
            duration={0.4}
            style={{ 'font-size': '3rem', 'line-height': '1' }}
          />
          {props.showLabels && (
            <span style={{ 'font-size': '0.8rem', 'opacity': '0.7' }}>sec</span>
          )}
        </div>
      </div>
    );
  };


  const renderStandardFormat = () => {
    // ---- CORRECCIÓN PARA ESTA FUNCIÓN ----
    // Ya no llamamos a getFormattedDisplay ni desestructuramos.
    // Usamos directamente el memo 'formattedDisplay'.

    return (
      <div style={{
        'display': 'flex',
        'align-items': 'baseline',
        'justify-content': 'center',
        'gap': '0.5rem',
        'font-family': 'monospace'
      }}>
        <AnimatedNumber 
          // Pasamos una función que accede a la propiedad del memo
          value={() => formattedDisplay().value}
          decimals={() => formattedDisplay().decimals || 0} // También reactivo!
          duration={0.4}
          style={{ 'font-size': '4rem', 'font-weight': 'bold', 'line-height': '1' }}
        />
        <span style={{ 'font-size': '2rem', 'opacity': '0.7', 'font-weight': '500' }}>
            {(() => formattedDisplay().unit) as any}
        </span>
        {props.showLabels && (
          <span style={{ 'font-size': '1rem', 'opacity': '0.5', 'margin-left': '0.5rem' }}>
            {(() => formattedDisplay().label) as any}
          </span>
        )}
      </div>
    );
  };

  return (
    <div style={{
      'padding': '2rem',
      'text-align': 'center',
      'color': '#1f2937'
    }}>
      {props.format === 'exact' ? renderExactFormat() : renderStandardFormat()}
    </div>
  );
}