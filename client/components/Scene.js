import { Canvas } from '@react-three/fiber'
import { Float, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Blob() {
  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <icosahedronGeometry args={[2.2, 32]} />
        <meshStandardMaterial color={'#22d3ee'} metalness={0.2} roughness={0.25} emissive={'#0ea5e9'} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true }}>
      <color attach="background" args={['#0b1220']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5,5,5]} intensity={1.2} />
      <Blob />
      <mesh position={[-3, -2.4, -1]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color={'#0b1220'} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
