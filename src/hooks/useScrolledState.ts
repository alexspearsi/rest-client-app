import { useEffect, useState } from 'react';

export default function useScrolledState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setScrolled(false);
      } else {
        setScrolled(true);
      }
    }

    document.addEventListener('scroll', onScroll);

    return () => document.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}
