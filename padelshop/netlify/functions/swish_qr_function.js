const axios = require("axios");

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

exports.handler =  async function(event, context, callback) {
    axios.post("https://mpc.getswish.net/qrg-swish/api/v1/prefilled", request, { headers: {
        'content-type': 'application/json'
      }
    }).then(resp => {
        // console.log("Resp.data: " + resp.data);
        // console.log("Resp from buffer: " + Buffer.from(resp.data, 'binary').toString())
        const body = resp.data;
        let dataUrl = await new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(body);
          });
        console.log("DataUrl: " + dataUrl);
        const response = {
            statusCode: 200,
            body: dataUrl,
            headers: {
            'content-type': 'plain/text',
            'cache-control': 'Cache-Control: max-age=300, public'
            }
        }
        callback(null, response)
    });
}