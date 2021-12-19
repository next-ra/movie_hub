import { useState, useCallback, useEffect } from 'react';

const useMediaQuery = (width, height) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useEffect(() => {
    const match = height
      ? `(max-width: ${width}px) and (max-height: ${height}px)`
      : `(max-width: ${width}px)`;

    const media = window.matchMedia(match);
    media.addEventListener('change', (e) => updateTarget(e));

    if (media.matches) {
      setTargetReached(true);
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e));
  }, [updateTarget, width, height]);

  return targetReached;
};

export default useMediaQuery;
