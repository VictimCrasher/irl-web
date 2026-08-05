import { useEffect, useState } from 'react';
import { QUALITY_TIERS } from '../constants';

const getTierKey = (width, reducedMotion) => {
  if (reducedMotion) return 'low';
  if (width > 768) return 'high';
  if (width > 480) return 'medium';
  return 'low';
};

const getCoarsePointer = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
};

export const useSceneQuality = () => {
  const [quality, setQuality] = useState(() => {
    if (typeof window === 'undefined') return QUALITY_TIERS.high;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const tierKey = getTierKey(window.innerWidth, reducedMotion);
    const tier = { ...QUALITY_TIERS[tierKey] };

    if (getCoarsePointer()) {
      tier.parallax = false;
    }

    return tier;
  });

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    const update = () => {
      const tierKey = getTierKey(window.innerWidth, motionQuery.matches);
      const tier = { ...QUALITY_TIERS[tierKey] };

      if (pointerQuery.matches) {
        tier.parallax = false;
      }

      setQuality(tier);
    };

    window.addEventListener('resize', update);
    motionQuery.addEventListener('change', update);
    pointerQuery.addEventListener('change', update);

    return () => {
      window.removeEventListener('resize', update);
      motionQuery.removeEventListener('change', update);
      pointerQuery.removeEventListener('change', update);
    };
  }, []);

  return quality;
};
