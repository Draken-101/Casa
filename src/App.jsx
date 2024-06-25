
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components';
const Div = styled.div`
    width: 100vw;
    height: 100vh;
`;
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Casa } from './Casa/Casa';
import { OrbitControls } from '@react-three/drei';
import { Stars } from './Stars/Stars';

export default function App() {
  return (
    <Div>
      <Canvas camera={{ position: [0, 30, -60] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 30, 10]} castShadow={true} />
        <OrbitControls />

        <Casa />
        <Stars />
      </Canvas>
    </Div>

  )
}
