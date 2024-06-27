/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 Loli.gltf --transform 
Files: Loli.gltf [6.15KB] > C:\Users\Draken-101\Desktop\3D\Web\Loli\Loli-transformed.glb [499.43KB] (-8021%)
*/

import React, { useEffect, useRef, useState } from 'react'
import { useGLTF, useTexture, useAnimations } from "@react-three/drei"
import { useFrame } from '@react-three/fiber'

export function Loli(props) {
  const { nodes, materials } = useGLTF('/Loli-transformed.glb')
  const { animations } = useGLTF("/stacy.glb")
  const { ref, actions, names } = useAnimations(animations)
  const [hovered, setHovered] = useState(false)
  const [index, setIndex] = useState(4)

  // Change cursor on hover-state
  useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])

  // Change animation when the index changes
  // useEffect(() => {
  //   // Reset and fade in animation after an index has been changed
  //   actions[names[index]].reset().fadeIn(0.5).play()
  //   // In the clean-up phase, fade it out
  //   return () => actions[names[index]].fadeOut(0.5)
  // }, [index, actions, names])

  return (
    <group {...props} dispose={null}>

      <mesh 
          castShadow
          receiveShadow
          geometry={nodes.lianhua_color_0.geometry} material={materials.color} position={[13.439, 14.006, -5.045]} rotation={[-2.66, -1.068, -2.717]} scale={0.027} />
      <mesh 
          castShadow
          receiveShadow
          geometry={nodes.outline_black_0.geometry} material={materials.black} position={[13.439, 14.006, -5.045]} rotation={[-2.66, -1.068, -2.717]} scale={0.027} />
      <mesh 
          castShadow
          receiveShadow
          geometry={nodes['outline_������_0'].geometry} material={materials.material} position={[13.439, 14.006, -5.045]} rotation={[-2.66, -1.068, -2.717]} scale={0.027} />
    </group >
  )
}

useGLTF.preload('/Loli-transformed.glb')
