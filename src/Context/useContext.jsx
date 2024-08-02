import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getData } from "./Data";

const WS_URI = 'ws://localhost:8000';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [devices, setDevices] = useState([]);
  const [actions, setActions] = useState([]);
  const [temperature, setTemperature] = useState(undefined);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    getData(setDevices, setActions);

    const socket = new WebSocket(WS_URI);

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ nameUser: 'CLIENT_CASA', role: 'CLIENT', type: 'CONNECTION', message: 'CONNECTION', status: true }));
      console.log('Conexión establecida');
    });

    socket.addEventListener('close', () => {
      console.log('Conexión cerrada');
    });

    socket.addEventListener('error', (error) => {
      console.error('Error en la conexión WebSocket:', error);
    });

    socket.addEventListener('message', (message) => {
      try {

        const dataJson = JSON.parse(message.data);
        switch (dataJson.event) {
          case "Trigger":
            console.log("Trigger");
            setDevices((prevDevices) =>
              prevDevices.map((device) => {
                if (device.nameDevice === dataJson.triggerDevice.nameDevice) {
                  return { ...device, status: dataJson.triggerDevice.status };
                }
                return device;
              })
            );
            break;
          case "newAction":
            setActions(prevActions => [...prevActions, dataJson.data])
            break;
          case "Temperature":
            // Verifica si dataJson tiene el campo 'temperature'
            if (dataJson.temperature !== undefined) {
              console.log("Temperatura recibida:", dataJson.temperature);
              setTemperature(dataJson.temperature);
            } else {
              console.error('Campo temperature no encontrado en el mensaje:', dataJson);
            }
            break;

        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });


    return () => {
      socket.close();
    };
  }, []);

  const value = useMemo(() => ({
    devices,
    setDevices,
    actions,
    setActions,
    temperature,
    setTemperature,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  }), [
    devices,
    actions,
    temperature,
    isAuthenticated,
    user
  ]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('No hay datos');
  }
  return context;
}
