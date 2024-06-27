/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 Monitor.gltf --transform 
Files: Monitor.gltf [11.67KB] > C:\Users\Draken-101\Desktop\3D\Web\Monitor\Monitor-transformed.glb [105.13KB] (-801%)
*/

import React, { useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'

export function Monitor(props) {
  const { nodes, materials } = useGLTF('/Monitor-transformed.glb');
  const [onOff, setOnOff] = useState(false);

  materials['Material.006'].emissiveIntensity = 100;  // Asegúrate de ajustar esto según sea necesario
  materials['Material.006'].toneMapped = false;
  return (
    <group {...props} dispose={null} onClick={() => {
      setOnOff(!onOff)
    }}>
      <group position={[-9.204, 12.854, 3.064]} rotation={[Math.PI / 2, 0, -1.887]} scale={[1.245, 0.281, 0.4]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003.geometry} material={onOff ? materials['Material.006'] : materials['monitor body']} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plane003_1.geometry} material={materials['monitor body']} />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.light_power.geometry} material={materials.On} position={[-9.463, 12.478, 2.223]} rotation={[Math.PI / 2, 0, -1.702]} scale={0.002} />
      <group position={[-12.521, 14.006, -13]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1.556, 1.275]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo_1.geometry} material={materials.Vidrio} />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo_2.geometry} material={materials.Metal} />
      </group>
    </group>
  )
}

useGLTF.preload('/Monitor-transformed.glb')