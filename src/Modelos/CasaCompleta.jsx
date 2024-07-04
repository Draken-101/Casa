import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { useState } from 'react';
import { Player } from './Player';
import { PuertaBaño } from './PuertaBaño/PuertaBaño';
import { Porton } from './Porton/Porton';
import { Monitor } from './Monitor/Monitor';
import { Clima } from './Clima/Clima';
import { Casa } from './Casa/Casa';
import { Loli } from './Loli/Loli';
import { PuertaCuarto } from './PuertaCuarto/PuertaCuarto'

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

export function CasaCompleta() {
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

            <Canvas shadows>
                <ambientLight intensity={.3} />
                <Player position={position} />
                <PuertaBaño/>
                <Porton />
                <Monitor />
                <Clima />
                <Casa />
                <Loli />
                <PuertaCuarto />
            </Canvas>
        </Div>
    )
}