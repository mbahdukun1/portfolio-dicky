import { useEffect, useState } from 'react';

export function useScrollSpy(ids: string[], offset = 120): string {
  const [activeId, setActiveId] = useState(ids[0] ?? '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      const atBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
      if (atBottom) {
        setActiveId(ids[ids.length - 1] ?? '');
        return;
      }

      let current = ids[0] ?? '';
      for (const id of ids) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) current = id;
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ids, offset]);

  return activeId;
}
