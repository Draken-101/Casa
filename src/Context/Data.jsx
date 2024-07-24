import axios from "axios";

export async function getData(setDevices) {
    try {
        const response = await axios.get('http://localhost:3000/api/v1/devices');
        setDevices([...response.data]);
    } catch (error) {
        console.error("Error fetching devices:", error);
    }
}
