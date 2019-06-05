const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

const bodyParser = require("body-parser");
const cors = require('cors');

const port = 3001;

let messages = [{date: "12:23 1.2.2019", username: 'kari', text: 'kova ääni'}, 
                {date: "12:23 1.2.2019", username: 'jari', text: 'kari'}];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({username: "username"}));

// http-post login
app.post('/', function (req, res) {
    var username = req.body.username;
    console.log("User name = " + username);
    res.send({username: username, success: true, messages: messages});
    res.end("yes");
});

// http-post message
app.post('/msg', function (req, res) {    
    console.log(req.body);
    res.end("yes");
});

// websocket send messages
app.ws('/ws', function(ws, req) {
    ws.on('message', function(msg) {
      console.log('ws on' + msg);
    });
    console.log('socket', req.testing);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.ws()