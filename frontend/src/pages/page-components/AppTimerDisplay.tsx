import { useRef, useState, useCallback, useEffect } from "react";

const AppTimerDisplay = (props: { limit: number; onTimeOut: () => void }) => {
  const timeRef = useRef<NodeJS.Timer>();

  const counterRef = useRef(0);
  const [counter, _setCounter] = useState(counterRef.current);

  const increaseCounter = useCallback(() => {
    counterRef.current++;
    _setCounter(counterRef.current);
    if (counterRef.current >= props.limit) {
      props.onTimeOut();
      clearInterval(timeRef.current);
    }
  }, [props.onTimeOut, props.limit]);

  useEffect(() => {
    timeRef.current = setInterval(increaseCounter, 1000);
    return () => {
      clearInterval(timeRef.current);
    };
  }, [increaseCounter]);
  return <>{props.limit - counter}</>;
};

export default AppTimerDisplay;
