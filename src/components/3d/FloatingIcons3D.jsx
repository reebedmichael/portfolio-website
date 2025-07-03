import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';

const TechIcon = ({ position, icon, color, speed = 1 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.001;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#60a5fa' : color} 
          transparent 
          opacity={0.8}
          wireframe={hovered}
        />
      </mesh>
      <Text
        position={[position[0], position[1] + 1.5, position[2]]}
        fontSize={0.5}
        color={hovered ? '#60a5fa' : '#ffffff'}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        {icon}
      </Text>
    </Float>
  );
};

const FloatingIcons3D = () => {
  const techIcons = [
    { icon: '⚛️', position: [-5, 2, -5], color: '#61dafb', speed: 1 },
    { icon: '🐍', position: [5, -2, -3], color: '#3776ab', speed: 1.2 },
    { icon: '⚡', position: [-3, 4, 2], color: '#f7df1e', speed: 0.8 },
    { icon: '☁️', position: [4, 1, 4], color: '#ff9900', speed: 1.1 },
    { icon: '🔧', position: [-2, -3, -4], color: '#e34f26', speed: 0.9 },
    { icon: '🚀', position: [3, 3, -2], color: '#764abc', speed: 1.3 },
    { icon: '💻', position: [-4, 0, 3], color: '#3178c6', speed: 1 },
    { icon: '🎨', position: [2, -4, 1], color: '#ff6b6b', speed: 1.1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        {techIcons.map((tech, index) => (
          <TechIcon
            key={index}
            position={tech.position}
            icon={tech.icon}
            color={tech.color}
            speed={tech.speed}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default FloatingIcons3D; 