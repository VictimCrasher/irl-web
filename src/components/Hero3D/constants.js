export const COLORS = {
  sun: '#FFBD13',
  sunCore: '#FFE566',
  skyDark: '#05132d',
  skyMid: '#0a2040',
  horizon: '#828283',
  orbit: '#6b8cb8',
  nebulaA: '#2c2f66',
  nebulaB: '#123a5e',
  nova: '#ffd9a0',
  mist: '#4a6a9c',
  outline: '#050d1d',
};

export const SUN_POSITION = [0, -6, 0];

// Every planet shares this single orbital plane, tilted once for perspective.
export const SYSTEM_TILT = 0.42;

// Default spherical camera pose around the sun (radius matches [0, 4, 20] → sun).
export const CAMERA_ORBIT = {
  radius: 22.4,
  theta: 0,
  phi: Math.atan2(22.4, 10),
};

export const PLANETS = [
  { radius: 5, size: 0.18, speed: 0.35, color: '#7eb8da', emissive: '#1d4a6b' },
  { radius: 8, size: 0.28, speed: 0.2, color: '#e8a87c', emissive: '#6b3a1d', hasRing: true },
  { radius: 12, size: 0.4, speed: 0.12, color: '#c9b8a8', emissive: '#4a3f35' },
  { radius: 17, size: 0.55, speed: 0.07, color: '#d4a574', emissive: '#5a3a1d' },
  { radius: 22, size: 0.12, speed: 0.5, color: '#b8c8e8', emissive: '#333f5c' },
];

export const QUALITY_TIERS = {
  high: {
    starCount: 420,
    dprCap: 2,
    mistLayers: 4,
    nebulaOctaves: 5,
    parallax: true,
    autoOrbit: true,
    postProcessing: true,
    outlines: true,
  },
  medium: {
    starCount: 260,
    dprCap: 1.5,
    mistLayers: 3,
    nebulaOctaves: 4,
    parallax: true,
    autoOrbit: true,
    postProcessing: true,
    outlines: true,
  },
  low: {
    starCount: 150,
    dprCap: 1,
    mistLayers: 2,
    nebulaOctaves: 3,
    parallax: false,
    autoOrbit: false,
    postProcessing: false,
    outlines: false,
  },
};
