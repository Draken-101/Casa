/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 Casa.gltf --transform 
Files: Casa.gltf [14.38KB] > C:\Users\Draken-101\Desktop\3D\Web\Casa\Casa-transformed.glb [1.34MB] (-9209%)
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { CuboidCollider, MeshCollider, RigidBody } from '@react-three/rapier'

export function Casa(props) {
  const { nodes, materials } = useGLTF('/Casa-transformed.glb')
  return (

    <group {...props} dispose={null}>
      <group position={[0, 0, -46]} scale={[52.075, 1.605, 66.682]}>
      
      <MeshCollider type='trimesh'>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano_1.geometry} material={materials.Material} />
      </MeshCollider>
        <mesh geometry={nodes.Plano_2.geometry} material={materials.Vidrio} />
      </group>
      <MeshCollider type='trimesh'>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo001.geometry}
          material={materials['Material.003']}
          position={[-14.5, 4.5, 18.5]}
          scale={[0.2, 4.5, 23.159]} />
      </MeshCollider>


      <MeshCollider type='trimesh'>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo002.geometry}
          material={materials['Material.004']}
          position={[14.512, 9.226, -3.485]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.19, -0.222, -23.169]} />
      </MeshCollider>

      <MeshCollider type='trimesh'>

        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cubo.geometry}
          material={materials.Metal}
          position={[-12.521, 14.006, -13]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[1, 1.556, 1.275]} />
      </MeshCollider>

    </group>



  )
}

useGLTF.preload('/Casa-transformed.glb')