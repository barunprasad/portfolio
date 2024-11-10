import { useEffect, useRef } from 'react';

// Naive implementation - in reality would want to attach
// a window or resize listener. Also use state/layoutEffect instead of ref/effect
// if this is important to know on initial client render.
// It would be safer to  return null for unmeasured states.
export const useDimensions = (ref: React.RefObject<HTMLElement>) => {
  const dimensions = useRef({ width: 0, height: 0 });

  const offsetWidth = ref.current?.offsetWidth;
  const offsetHeight = ref.current?.offsetHeight;

  useEffect(() => {
    dimensions.current.width = offsetWidth ? offsetWidth : 0;
    dimensions.current.height = offsetHeight ? offsetHeight : 0;
  }, [offsetWidth, offsetHeight]);

  return dimensions.current;
};
