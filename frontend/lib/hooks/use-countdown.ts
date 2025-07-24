import { useState, useEffect, useCallback } from 'react';

export function useCountdown(initialMinutes: number = 10) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // saniye cinsinden
  const [isActive, setIsActive] = useState(false);

  const startCountdown = useCallback(() => {
    setTimeLeft(initialMinutes * 60);
    setIsActive(true);
  }, [initialMinutes]);

  const resetCountdown = useCallback(() => {
    setTimeLeft(initialMinutes * 60);
    setIsActive(false);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setIsActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isActive,
    isExpired: timeLeft === 0,
    startCountdown,
    resetCountdown,
  };
}