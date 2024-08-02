import axios from "axios";

export async function getData(setDevices, setActions) {
    try {
        let response = await axios.get('http://localhost:3000/api/v1/devices');
        setDevices([...response.data]);
        response = await axios.get('http://localhost:3000/api/v1/Actions');
        setActions([...response.data]);
    } catch (error) {
        console.error("Error fetching devices:", error);
    }
}
