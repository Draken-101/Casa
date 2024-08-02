import { Canvas } from '@react-three/fiber';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Player } from './Player';
import { PuertaBaño } from './PuertaBaño/PuertaBaño';
import { Porton } from './Porton/Porton';
import { Monitor } from './Monitor/Monitor';
import { Clima } from './Clima/Clima';
import { Casa } from './Casa/Casa';
import { Loli } from './Loli/Loli';
import { PuertaCuarto } from './PuertaCuarto/PuertaCuarto'
import { UserProvider, useUserContext } from '../Context/useContext';

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
    border-radius: 0.5vw;
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
  label{
    border-radius: 0.5vw;
    font-size: 1.5vw;
    transition: .3s;
    padding: 1vw;
    margin: 2vw;
    left: 0;
    top: 0;
    background-color: #4d4d4d77;
    color: #b6b6b6;
    border: 0;
    position: absolute;
    z-index: 10;
  }
  .lastAction{
    left: auto;
    right: 0 !important;
    top: 0;
  }
`;

export function CasaCompleta() {
  const [position, setPosition] = useState(0);
  const [action, setAction] = useState({});
  const { temperature, actions } = useUserContext();

  useEffect(() => {
    if (actions.length > 0) {
      const lastActionIndex = actions.length - 1;
      setAction(actions[lastActionIndex]);
    }
  }, [actions])
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
      <label htmlFor="">{temperature}°C</label>
      <label htmlFor="" className='lastAction'>
        <div>
          <b>Ultima accion</b>
        </div>

        <div>
          <b>user: </b>{action.user} <br />
        </div>
        <div>
          <b>role: </b>{action.role} <br />
        </div>
        <div>
          <b>device: </b>{action.device} <br />
        </div>
      </label>

      <Canvas shadows>
        <ambientLight intensity={.3} />
        <Player position={position} />
        <PuertaBaño />
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