import {useEffect} from 'react';

const useEventListener = (
  event: keyof DocumentEventMap,
  fn: (ev?: DocumentEventMap[keyof DocumentEventMap]) => void,
  callOnStart = false,
) => {
  useEffect(() => {
    if (callOnStart) fn();
    document.addEventListener(event, fn);
    return () => {
      document.removeEventListener(event, fn);
    };
  }, []);
};

export default useEventListener;
