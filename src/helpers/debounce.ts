/**
 * Each time the callback gets called, it resets the counter
 */
export function debounce(callback: () => void, delay: number) {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
  };
}

/**
 * The callback can't be called again until the counter finishes
 */
export function throttle(fn: (...args: any[]) => void, delay = 150) {
  let timer: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    if (timer !== undefined) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = undefined;
    }, delay);
  };
}
