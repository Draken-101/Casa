
import { WebSocket } from "ws";

export async function getData(setDevices) {
    const socket = await WebSocket('ws://localhost:8000')
        .then(data => {
            setDevices([...data.data]);
        })
    socket.addEventListener('open', () => {
        socket.send({event:'getDevices', user: });
    });

    socket.addEventListener('', () => {
        
    });
    const source = new EventSource('http://localhost:3000/api/v1/devices/realTimeStatusDevices');

    source.addEventListener('Trigger', (event) => {
        try {
            const updateDevice = JSON.parse(event.data);
            console.log(updateDevice);

            setDevices(prevDevices => (prevDevices?.map(device => {
                if (device.nameDevice == updateDevice.nameDevice) {

                    device.status = updateDevice.status;
                    console.log(device.status);
                }
                return device;
            })))
        } catch (error) {
            console.log(error);
        }
    })
}