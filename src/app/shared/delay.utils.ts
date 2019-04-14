export function debounce(func: any, wait: number, immediate: boolean) {
  let timeout: number | undefined;
  return function(this: any) {
    const args = arguments;
    const later = () => {
      timeout = undefined;
      if (!immediate) {
        func.apply(this, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  };
}
