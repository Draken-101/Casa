import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useUserContext } from '../Context/useContext';

const Div = styled.div`
  width: 98vw;
  height: calc(100vh - 2vw);
  display: flex;
  flex-direction: column-reverse;
  overflow: hidden;
  overflow-y: scroll;
  padding: 1vw;
  background-color: transparent;
  color: #9b9b9b;
  &::-webkit-scrollbar {
    display: none;
  }
  gap: 1vw;

  label {
    display: flex;
    gap: 3vw;
    border-radius: 0.5vw;
    font-size: 3vw;
    transition: 0.3s;
    padding: 1vw;
    background-color: #4d4d4d77;
    color: #b6b6b6;
    border: 0;

    b {
      color: white;
    }
  }
`;

export default function Actions() {
  const { actions } = useUserContext();
  const divRef = useRef(null);

  useEffect(() => {
    // Espera a que el contenido se renderice y luego desplaza al último hijo
    const timer = setTimeout(() => {
      if (divRef.current) {
        // Encuentra el último hijo
        const lastChild = divRef.current.lastChild;
        if (lastChild) {
          lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      }
    }, 0); // El timeout de 0 permite que el renderizado se complete primero

    return () => clearTimeout(timer); // Limpiar el timeout si el componente se desmonta
  }, [actions]);

  return (
    <Div ref={divRef}>
      {actions.map((action, index) => (
        <label key={index}>
          <div>
            <b>id: </b>{index} <br />
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
      ))}
    </Div>
  );
}
