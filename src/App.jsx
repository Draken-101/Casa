
import { Canvas } from '@react-three/fiber'
import styled from 'styled-components';
const Div = styled.div`
    width: 100vw;
    height: 100vh;
`;
function App() {
  return (
    <>
      <Div>
        <Canvas>
          <ambientLight intensity={.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial />
          </mesh>
        </Canvas>
      </Div>
    </>
  )
}

export default App
