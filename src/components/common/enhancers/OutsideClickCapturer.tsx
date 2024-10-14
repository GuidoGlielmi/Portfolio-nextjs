import useEventListener from '@hooks/useEventListener';
import React, {useRef} from 'react';

type ClickRecorderProps = {
  cb: () => void;
  children: React.ReactNode;
  className?: string;
};

const OutsideClickCapturer = ({cb, className, children}: ClickRecorderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleClose = (e?: DocumentEventMap[keyof DocumentEventMap]) => {
    if (!!ref.current && e && e.target && !ref.current?.contains(e.target as HTMLElement)) {
      cb();
    }
  };

  useEventListener('touchstart', handleClose);
  useEventListener('click', handleClose);

  return (
    <div
      className={className}
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default OutsideClickCapturer;
