import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "/.netlify/functions",
    timeout: 10000
});

export async function GetSwishQRCode() {
    const data = axiosInstance.get("swish_qr_function").then(resp => {
        console.log("Swish response: " + resp.data)
    });

    return data;
}