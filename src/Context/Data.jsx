import axios from "axios";

export async function getData(setDevices) {
    await axios.get('http://localhost:3000/api/v1/devices')
        .then(data => {
            setDevices([...data.data]);
        })
    const source = new EventSource('http://localhost:3000/api/v1/devices/realTimeStatusDevices');
    console.log("realTimeStatusDevices");

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