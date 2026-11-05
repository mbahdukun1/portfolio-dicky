import { useEffect, useState } from 'react';

interface ZoneClock {
  time: string;
  offsetLabel: string;
}

function hoursAhead(timeZone: string, now: Date): number {
  const zoned = new Date(now.toLocaleString('en-US', { timeZone }));
  const local = new Date(now.toLocaleString('en-US'));
  return Math.round((zoned.getTime() - local.getTime()) / 3_600_000);
}

function read(timeZone: string): ZoneClock {
  const now = new Date();
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  const diff = hoursAhead(timeZone, now);
  const offsetLabel =
    diff === 0 ? 'same time as you' : `${Math.abs(diff)}h ${diff > 0 ? 'ahead of' : 'behind'} you`;

  return { time, offsetLabel };
}

export function useZoneClock(timeZone: string): ZoneClock {
  const [clock, setClock] = useState(() => read(timeZone));

  useEffect(() => {
    const timer = window.setInterval(() => setClock(read(timeZone)), 1000);
    return () => window.clearInterval(timer);
  }, [timeZone]);

  return clock;
}
