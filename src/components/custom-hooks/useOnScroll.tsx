import useEventListener from './useEventListener';

const useOnScroll = (fn: () => void) => {
  useEventListener('scroll', fn);
};

export default useOnScroll;
