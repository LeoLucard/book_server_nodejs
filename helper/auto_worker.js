const https = require('https');

const worker = () => {

    setInterval(function(){
        const options = {
            hostname: 'google.com',
            port: 443,
            path: '/',
            method: 'GET'
        };

        
        const req = https.request(options, (res) => {
            console.log("success posted to server");
        });

        req.on('error', (e) => {
            console.error(e.message);
        });
        req.end();
    }, 840000);
}

module.exports = {worker};