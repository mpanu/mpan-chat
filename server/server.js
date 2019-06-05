const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
// http-post
const bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
// cross-site
const cors = require('cors'); 
app.use(cors()); 

const port = 3001;

let messages = [{ date: "12:23 1.2.2019", username: 'kari', text: 'kova ääni' },
{ date: "12:23 1.2.2019", username: 'jari', text: 'kari' }];

// the clients
let connects = [];

// TODO index
app.get('/', (req, res) => res.json({ username: "username" }));

// http-post login
app.post('/', function (req, res) {
    var username = req.body.username;
    console.log("User name = " + username);
    res.send({ username: username, success: true, messages: messages });
    res.end("yes");
});

// http-post message
app.post('/msg', function (req, res) {
    console.log(req.body);
    res.end("yes");
});

// websocket send messages
app.ws('/ws', function (ws, req) {
    connects.push(ws);

    // temporary fart sender
    connects.forEach(socket => {
        socket.send('pieru');
    });

    ws.on('message', function (msg) {
        console.log('ws on' + msg);
        //put msg sending here
    });
    console.log('socket open');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

