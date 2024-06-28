import { Canvas, useFrame } from '@react-three/fiber';
import styled from 'styled-components';
import { OrbitControls, OrthographicCamera, PerspectiveCamera } from '@react-three/drei';
import { Stars } from './Stars/Stars';
import { PuertaCuarto } from './PuertaCuarto/PuertaCuarto';
import { Casa } from './Casa/Casa';
import { Loli } from './Loli/Loli';
import Controller from 'ecctrl';
import { Player } from './Player';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { PuertaBaño } from './PuertaBaño/PuertaBaño';
import { Monitor } from './Monitor/Monitor';
import { Clima } from './Clima/Clima';
import * as THREE from 'three';
import { Porton } from './Porton/Porton';
import { useRef, useState } from 'react';

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
  button{
    position: absolute;
    z-index: 10;
    padding: 1vw 5vw;
    background-color: #4d4d4d77;
    color: #b6b6b6;
    border: 0;
    font-size: 1.5vw;
    bottom: 0;
    margin: 2vw;
    transition: .3s;
    &:hover{
      background-color: #80808077;
      color: white;
      border-radius: .2vw;
      cursor: pointer;
    }
  }
`;

export default function App() {
  const [position, setPosition] = useState(0);
  const handlerPosition = () => {
    console.log(position);
    if (position < 2) {
      setPosition(prevPosition => (prevPosition + 1));
    } else {
      setPosition(0);
    }
  }
  return (
    <Div>
      <button onClick={handlerPosition}>Mover Camara</button>
      <Canvas shadows gl={{ antialias: true, shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}>
        <directionalLight
          intensity={1}
          castShadow
          shadow-bias={-0.0004}
          position={[-20, 20, 20]}
          shadow-mapSize-width={1048}
          shadow-mapSize-height={1048}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        >
          <OrthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={.2} />

        {/* Física y objetos */}
        <Physics timeStep="vary">
          <RigidBody type="fixed" colliders='trimesh'>
            <Player position={position}/>
            <PuertaBaño />
            <Porton />
            <Monitor />
            <Clima />
            <Casa />
            <Loli />
            <PuertaCuarto />
            <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
          </RigidBody>
          <Stars />
        </Physics>
      </Canvas>
    </Div>
  );
}
