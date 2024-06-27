import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Porton(props) {
  const { nodes, materials } = useGLTF('/Porton-transformed.glb')
  const lightRef1 = useRef();
  const lightRef2 = useRef();

  return (
    <group {...props} dispose={null}>
      <group position={[-14.5, 4.5, 18.5]} scale={[0.2, 4.5, 23.159]}>
        <mesh
          castShadow
          receiveShadow geometry={nodes.Cubo001_1.geometry} material={materials.Material} />
        <mesh
          castShadow
          receiveShadow geometry={nodes.Cubo001_2.geometry} material={materials['Material.003']} />
      </group>
      <group position={[-3.777, 8.021, -26.492]} scale={[6.45, 1, 0.103]}>
        <mesh
          castShadow
          receiveShadow geometry={nodes.Plane004.geometry} material={materials['Material.007']} />
        <mesh
          castShadow
          receiveShadow geometry={nodes.Plane004_1.geometry} material={materials.Vidrio} />
      </group>
      <mesh geometry={nodes.Cubo.geometry} material={materials.Metal} position={[-12.521, 14.006, -13]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1.556, 1.275]} />
      
      {/* Adding the small glowing ball */}
      <mesh position={[-3.777, 7.8, -27.5]} scale={[0.2, 0.2, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={'white'} />
      </mesh>
      
      <pointLight
        ref={lightRef1}
        position={[-3.777, 7, -27.5]}
        color={'white'}
        intensity={100}  // Intensidad de la luz
        distance={100}  // Ajusta la distancia a 10
        decay={2}  // Ajusta la atenuación según necesites
        castShadow
      />
      {/* Adding the small glowing ball */}
      <mesh position={[-3.777, 8.5, -18]} scale={[0.2, 0.2, 0.2]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color={'white'} />
      </mesh>
      
      <pointLight
        ref={lightRef2}
        position={[-3.777, 7, -18]}
        color={'white'}
        intensity={100}  // Intensidad de la luz
        distance={100}  // Ajusta la distancia a 10
        decay={2}  // Ajusta la atenuación según necesites
        castShadow
      />
    </group>
  )
}

useGLTF.preload('/Porton-transformed.glb')
