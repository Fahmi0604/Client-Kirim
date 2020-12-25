const express = require('express')
const upload = require('express-fileupload')
const ipfilter = require('express-ipfilter').IpFilter

const myFolder = './uploads/';
var fs = require('fs')

const app = express()

app.use(upload())
app.listen(5000, function () {
    console.log("Listen at 5000")
})

app.get('/', (req, res) => {
    var trustedIps = ['::1']; // Only Server can Access
    var requestIP = req.connection.remoteAddress;
    if(trustedIps.indexOf(requestIP) >= 0) {
        res.sendFile(__dirname + '/index.html')
    } else {
        res.send("Sorry, No access")
    }
})

app.post('/', (req, res) => {
    if (req.files) {
        console.log(req.files)
        var file = req.files.file
        fs.readFile(file.name, 'utf8', function (err, data) {
            if (err) throw err;
            res.send(data)
        });
    }
})

app.get('/folder', (req, res) => {
    fs.readdir(myFolder, (err, files) => {
        if (err) {
            return console.log('Unable to scan directory: ' + err)
        }
        files.forEach(file => {
            // res.send(file)
            console.log(file)
        });
    });
})

module.exports = app