import { createEffect, onMount, createSignal } from 'solid-js';
import { CountUp } from 'countup.js';
// Definimos un tipo genérico para una prop que puede ser un valor o una función que devuelve ese valor.
type MaybeAccessor<T> = T | (() => T);

interface AnimatedNumberProps {
  value: () => number;
  duration?: MaybeAccessor<number>;
  separator?: MaybeAccessor<string>;
  prefix?: MaybeAccessor<string>;
  suffix?: MaybeAccessor<string>;
  decimals?: MaybeAccessor<number>;
  useEasing?: MaybeAccessor<boolean>;
  useGrouping?: MaybeAccessor<boolean>;
  style?: any; // El estilo ya es un objeto, así que lo dejamos como está.
}

export default function AnimatedNumber(props: AnimatedNumberProps) {
  let numberRef: HTMLSpanElement;
  let countUp: CountUp;
  const [previousValue, setPreviousValue] = createSignal(props.value());

  onMount(() => {
    const options = {
      duration: props.duration || 0.6,
      separator: props.separator || '',
      prefix: props.prefix || '',
      suffix: props.suffix || '',
      decimals: props.decimals || 0,
      useEasing: props.useEasing !== false,
      useGrouping: props.useGrouping || false,
    };
    //@ts-ignore
    countUp = new CountUp(numberRef, props.value(), options);
    if (!countUp.error) {
      countUp.start();
    }
    setPreviousValue(props.value());
  });

  createEffect(() => {
    const currentValue = props.value();
    const prevValue = previousValue();
    
    // Solo animar si el valor realmente cambió
    if (countUp && !countUp.error && currentValue !== prevValue) {
      countUp.update(currentValue);
      setPreviousValue(currentValue);
    }
  });

  return (
    <span 
      ref={numberRef!} 
      style={props.style || {}}
    >
      {props.value()}
    </span>
  );
}