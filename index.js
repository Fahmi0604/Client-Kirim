const express = require('express')
const upload = require('express-fileupload')
var fs = require('fs')

const app = express()

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    if (req.files){
        console.log(req.files)
        var file = req.files.file
        fs.readFile(file.name, 'utf8', function(err, data) {
            if (err) throw err;
            res.send(data)
        });
    }
})

app.listen(5000, function () {
    console.log("Listen at 5000")
})