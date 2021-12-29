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

exports.handler =  function(event, context, callback) {
    axios.post("https://mpc.getswish.net/qrg-swish/api/v1/prefilled", request, { headers: {
        'content-type': 'application/json'
      }
    }).then(resp => {
        console.log("Resp from swish in function: " + resp)
        const body = JSON.stringify({ resp })
        const response = {
            statusCode: 200,
            body: body,
            headers: {
            'content-type': 'application/json',
            'cache-control': 'Cache-Control: max-age=300, public'
            }
        }
        callback(null, response)
    });
}