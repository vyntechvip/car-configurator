'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import CarModel from './CarModel'

export default function Scene({ color }) {
  return (
    <div className="w-full h-96 rounded-lg overflow-hidden">
      <Canvas
        shadows
        camera={{ 
          position: [0, 1.5, 5], // Better camera position
          fov: 60, // Wider field of view
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        {/* Improved Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 7]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-10, 0, -10]} intensity={0.5} />
        
        {/* Car Model */}
        <CarModel color={color} />
        
        {/* Better Controls */}
        <OrbitControls
          enablePan={false} // Disable panning for better experience
          enableZoom={true}
          enableRotate={true}
          minDistance={3}
          maxDistance={15}
          target={[0, 0.5, 0]} // Focus on car center
        />
        
        {/* Environment */}
        <Environment preset="dawn" />
      </Canvas>
      
      {/* Controls Help */}
      <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-2 text-xs">
        <div className="text-gray-300">
          <div>🖱️ Drag to rotate</div>
          <div>📌 Scroll to zoom</div>
        </div>
      </div>
    </div>
  )
}