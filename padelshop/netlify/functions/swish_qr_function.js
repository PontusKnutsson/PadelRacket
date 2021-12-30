const axios = require("axios");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const xhr = new XMLHttpRequest();

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

exports.handler = function(event, context, callback) {
    xhr.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            // var img = document.getElementById('image');
            // var url = window.URL || window.webkitURL;
            const test = window.URL.createObjectURL(this.response);
            console.log(test);
            const response = {
                statusCode: 200,
                body: test,
                headers: {
                'content-type': 'plain/text',
                'cache-control': 'Cache-Control: max-age=300, public'
                }
            }
            callback(null, response)
        }
    }
    // Relative path because : 
    // No 'Access-Control-Allow-Origin' header is present...
    xhr.open('POST', 'https://mpc.getswish.net/qrg-swish/api/v1/prefilled');
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.responseType = 'blob';
    xhr.send(JSON.stringify(request));



    // axios.post("https://mpc.getswish.net/qrg-swish/api/v1/prefilled", request, { headers: {
    //     'content-type': 'application/json'
    //   }
    // }).then(resp => {
    //     // console.log("Resp.data: " + resp.data);
    //     // console.log("Resp from buffer: " + Buffer.from(resp.data, 'binary').toString())
    //     const body = resp.data;
        // const response = {
        //     statusCode: 200,
        //     body: body,
        //     headers: {
        //     'content-type': 'plain/text',
        //     'cache-control': 'Cache-Control: max-age=300, public'
        //     }
        // }
        // callback(null, response)
    // });
}