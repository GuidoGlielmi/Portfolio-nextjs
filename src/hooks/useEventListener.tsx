import {useEffect} from 'react';

type UseEventListenerProps = {
  event: keyof DocumentEventMap;
  fn: (ev?: DocumentEventMap[keyof DocumentEventMap]) => void | undefined;
  callOnStart?: boolean;
  element?: Node;
};

const useEventListener = ({event, fn, callOnStart = false, element}: UseEventListenerProps) => {
  useEffect(() => {
    if (callOnStart) fn();
    (element || document).addEventListener(event, fn);
    return () => {
      (element || document).removeEventListener(event, fn);
    };
  }, []);
};

export default useEventListener;
