const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
require('dotenv/config');

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static("public"));

// Storage when upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

// Upload file
const upload = multer({ storage: storage });
app.post('/uploadFile', upload.single('image'), (req, res) => {
    res.send(req.file);
});

// Views
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/ejs/type', (req, res) => {
    res.render('type');
})
app.post('/ejs/type', (req, res) => {
    res.send(req.body.txtType);
})

app.get('/ejs/upload-file', (req, res) => {
    res.render('upload-file');
})


// Mlab mongodb connect
// mongoose.connect("mongodb://khanh:XacEBNKqFXCCOKLC@cluster0-shard-00-00-p5kau.gcp.mongodb.net:27017,cluster0-shard-00-01-p5kau.gcp.mongodb.net:27017,cluster0-shard-00-02-p5kau.gcp.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority",
//     { useNewUrlParser: true },
//     (err) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             console.log("Connected");
//         }
//     })


// Import Routes
const songRoute = require('./routes/songRoute');
app.use('/song', songRoute);

const typeRoute = require('./routes/typeRoute');
app.use('/type', typeRoute);

// Get sensor list
// app.get('/sensor', (req, res) => {
//     db.collection('sensor_data').find().toArray((err, result) => {
//         if (err) throw err
//         res.send(result);
//     })

// })

// Start listening server
const port = process.env.PORT || '8888';
app.listen(port, () => { console.log(`Listening port ${port}...`) })
