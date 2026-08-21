import { useState, useEffect } from 'react';
import type { CountdownTime } from '@/types';

export function useCountdown(targetDate: string): CountdownTime {
  const [countdown, setCountdown] = useState<CountdownTime>(() => calc(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calc(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return countdown;
}

function calc(targetDate: string): CountdownTime {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isExpired: false,
  };
}
