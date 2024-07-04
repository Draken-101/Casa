import axios from "axios";

export async function getData(setDevices) {
    await axios.get('http://localhost:3000/api/v1/devices/')
        .then(data => {
            setDevices([...data.data]);
        })
    const source = new EventSource('http://localhost:3000/api/v1/devices/realTimeStatusDevices');

    source.addEventListener('Trigger', (event) => {
        try {
            const updateDevice = JSON.parse(event.data);
            console.log(updateDevice);

            setDevices(prevDevices => (prevDevices?.map(device => {
                if (device.name == updateDevice.name) {
                    device.status = updateDevice.status;
                }
                return device;
            })))
        } catch (error) {
            console.log(error);
        }
    })
}