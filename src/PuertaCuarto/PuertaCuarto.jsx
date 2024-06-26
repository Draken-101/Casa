/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 Puerta.gltf --transform 
Files: Puerta.gltf [3.36KB] > C:\Users\Draken-101\Desktop\3D\Web\Puerta\Puerta-transformed.glb [2.98KB] (11%)
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function PuertaCuarto(props) {
  const { nodes, materials } = useGLTF('/Puerta-transformed.glb');
  const [doorState, setDoorState] = useState(false);
  const [doorPosition, setDoorPosition] = useState({
    x: -9.761, y: 13.853, z: -11.613,
    rotation: [0, 0, 0]
  })
      // useFrame((a) => {

      //   console.log(a.clock.elapsedTime);
      // });
  useEffect(() => {
    if (doorState) {
      setDoorPosition({ x: -8.561, y: 13.853, z: -12.75, rotation: [0, 1.5, 0] });
    } else {
      setDoorPosition({ x: -9.761, y: 13.853, z: -11.613, rotation: [0, 0, 0] });
    }
  }, [doorState])

  return (
    <group {...props} dispose={null}>
      <group position={[doorPosition.x, doorPosition.y, doorPosition.z]} scale={[0.899, 1.554, 1.984]} rotation={doorPosition.rotation}>
        <mesh geometry={nodes.Cubo_1.geometry} material={materials.Vidrio} onClick={() => {
          setDoorState(prevDoorState => (!prevDoorState));
        }} />
        <mesh geometry={nodes.Cubo_2.geometry} material={materials.Metal} onClick={() => {
          setDoorState(prevDoorState => (!prevDoorState));
        }} />
      </group>
    </group>
  )
}

useGLTF.preload('/Puerta-transformed.glb')
