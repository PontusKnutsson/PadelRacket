import axios from 'axios'

const request = {
    "format": "png",
    "size": 300,
    "transparent": false,
    "amount": {
        "value": 999.99,
        "editable": true
    },
    "payee": {
        "value": "0730723472",
        "editable": false
    },
    "message": {
        "value": "Hello",
        "editable": false
    }
}

export async function GetSwishQRCode() {
    const result = await axios.post("https://mpc.getswish.net/qrg-swish	/api/v1/prefilled", request);

    console.log("Swish response: " + result);
}