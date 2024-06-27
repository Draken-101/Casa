import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: relative;
  span{
    position: absolute;
    z-index: 10;
    width: 5px;
    height: 5px;
    background-color: #ffffff;
    border-radius: 50%;
    filter: invert(1);
  }
`;
import { Environment, KeyboardControls, OrbitControls, OrthographicCamera, PointerLockControls } from '@react-three/drei';
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

export default function App() {
  return (
    <Div>
      <span></span>
      <Canvas shadows gl={{ antialias: true, shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}>
        <directionalLight 
          intensity={1} 
          castShadow 
          shadow-bias={-0.0004} 
          position={[-20, 20, 20]} 
          shadow-mapSize-width={5048} 
          shadow-mapSize-height={5048}
          shadow-camera-left={-20}
          shadow-camera-right={20}
          shadow-camera-top={20}
          shadow-camera-bottom={-20}
        >
          <OrthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={.2} />
        <Physics timeStep="vary">
          <KeyboardControls
            map={[
              { name: "forward", keys: ["ArrowUp", "w", "W"] },
              { name: "backward", keys: ["ArrowDown", "s", "S"] },
              { name: "left", keys: ["ArrowLeft", "a", "A"] },
              { name: "right", keys: ["ArrowRight", "d", "D"] },
              { name: "jump", keys: ["Space"] },
            ]}>

            <Player />
            <PointerLockControls />

            <RigidBody type="fixed" colliders='trimesh'>
              <PuertaBaño />
              <Porton/>
              <Monitor />
              <Clima />
              <Casa />
              <Loli />
              <PuertaCuarto />
              <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
            </RigidBody>
            <Stars />
          </KeyboardControls>
        </Physics>
      </Canvas>
    </Div>
  );
}
