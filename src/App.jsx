
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components';
const Div = styled.div`
    width: 100vw;
    height: 100vh;
`;
import { KeyboardControls, OrbitControls, PointerLockControls } from '@react-three/drei';
import { Stars } from './Stars/Stars';
import { PuertaCuarto } from './PuertaCuarto/PuertaCuarto';
import { Casa } from './Casa/Casa';
import { Loli } from './Loli/Loli';
import { Player } from './Player';
import { CuboidCollider, Physics, RigidBody } from '@react-three/rapier';

export default function App() {
  return (
    <Div>

      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "w", "W"] },
          { name: "backward", keys: ["ArrowDown", "s", "S"] },
          { name: "left", keys: ["ArrowLeft", "a", "A"] },
          { name: "right", keys: ["ArrowRight", "d", "D"] },
          { name: "jump", keys: ["Space"] },
          { name: "run", keys: ["Shift"] },
        ]}>
        <Canvas shadows camera={{ fov: 45 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[10, 30, 10]} castShadow />
          <Physics gravity={[0, -30, 0]}>
            <Player />
            <RigidBody   type="fixed" colliders={false}>
              <Casa />
              <Loli />
              <PuertaCuarto />
              <CuboidCollider args={[1000, 2, 1000]} position={[0, -2, 0]} />
            </RigidBody>
            <Stars />
          </Physics>
          <PointerLockControls />
        </Canvas>
      </KeyboardControls>
    </Div>

  )
}
