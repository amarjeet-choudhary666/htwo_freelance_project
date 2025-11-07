import { useEffect } from 'react';

interface UseScrollToTopOptions {
  smooth?: boolean;
  delay?: number;
  offset?: number;
}

export const useScrollToTop = (options: UseScrollToTopOptions = {}) => {
  const { smooth = true, delay = 0, offset = 0 } = options;

  const scrollToTop = () => {
    window.scrollTo({
      top: offset,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  useEffect(() => {
    if (delay > 0) {
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [delay, smooth, offset]);

  return scrollToTop;
};

// Hook for manual scroll to top (can be used with buttons, etc.)
export const useManualScrollToTop = (options: UseScrollToTopOptions = {}) => {
  const { smooth = true, offset = 0 } = options;

  const scrollToTop = () => {
    window.scrollTo({
      top: offset,
      left: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  };

  return scrollToTop;
};