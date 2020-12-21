const express = require('express')
const upload = require('express-fileupload')

const app = express()

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    if (req.files){
        console.log(req.files)
        var file = req.files.file
        var filename = file.name
    }
})

app.listen(5000)