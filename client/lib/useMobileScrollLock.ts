import { useEffect } from 'react';

export function useMobileScrollLock(lock = false) {
  useEffect(() => {
    if (!lock) return;

    const cancel = (e: TouchEvent) => e.preventDefault();
    document.addEventListener('touchmove', cancel, { passive: false });
    return () => {
      document.removeEventListener('touchmove', cancel);
    };
  }, [lock]);
}
