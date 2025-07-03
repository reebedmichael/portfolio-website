import React from 'react';
import Particles from 'react-tsparticles';

const ParticleBackground = () => (
  <Particles
    id="tsparticles"
    className="absolute inset-0 -z-10"
    options={{
      fullScreen: false,
      background: { color: { value: 'transparent' } },
      particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: ['#6366F1', '#06B6D4', '#F472B6', '#F59E42', '#10B981'] },
        shape: { type: 'circle' },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        move: { enable: true, speed: 1.2, direction: 'none', outModes: { default: 'out' } },
        links: { enable: true, color: '#fff', opacity: 0.2, width: 1 },
      },
      detectRetina: true,
    }}
  />
);

export default ParticleBackground; 