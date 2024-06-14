
import { Canvas, useFrame } from '@react-three/fiber'
import { useState } from 'react';
import styled from 'styled-components';
const Div = styled.div`
    width: 100vw;
    height: 100vh;
`;

function MyAnimatedBox() {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 5 });
  useFrame(({ clock }) => {
    setRotation({ x: rotation.x + .01, y: rotation.y + .01, z: rotation.z - 0.01 })
    const a = clock.getElapsedTime()
    console.log(a)
  })
  return (
    <mesh rotation={[rotation.x , rotation.y, rotation.z]} position={[Math.cos(rotation.x * 2) * 2, Math.sin(rotation.y * 3) * 2, 0]}>
      <boxGeometry />
      <meshStandardMaterial color={'purple'} />
    </mesh>
  )
}
function App() {

  return (
    <>
      <Div>
        <Canvas shadows={true}>
          <ambientLight intensity={.5} />
          <directionalLight color="red" position={[0, 5, 5]} />
          <MyAnimatedBox />
        </Canvas>
      </Div>
    </>
  )
}

export default App
