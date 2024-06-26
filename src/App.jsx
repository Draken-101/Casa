
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components';
const Div = styled.div`
    width: 100vw;
    height: 100vh;
`;
import { Environment, KeyboardControls, OrbitControls, OrthographicCamera, PointerLockControls } from '@react-three/drei';
import { Stars } from './Stars/Stars';
import { PuertaCuarto } from './PuertaCuarto/PuertaCuarto';
import { Casa } from './Casa/Casa';
import { Loli } from './Loli/Loli';
import Controller from 'ecctrl'
import { Player } from './Player';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';
import { PuertaBaño } from './PuertaBaño/PuertaBaño';

export default function App() {
  return (
    <Div>
      <Canvas shadows >
        <Environment files="/night.hdr" ground={{ scale: 1000 }} position={[0,0,-40]} />
        <directionalLight intensity={0.7} castShadow shadow-bias={-0.0004} position={[-20, 20, 20]}>
          <OrthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]} />
        </directionalLight>
        <ambientLight intensity={0.2} />
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
              <PuertaBaño/>
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

  )
}
