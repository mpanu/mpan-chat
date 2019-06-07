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
let connections = [];

// TODO index
app.get('/', (req, res) => res.json({ username: "username" }));

// http-post receive login
app.post('/', function (req, res) {
  var username = req.body.username;
  console.log("User name = " + username);
  res.send({ username: username, success: true, messages: messages });
  res.end("yes");
});

// websocket send messages
app.ws('/ws', function (ws, req) {
  // store ws, username and init channel
  ws.on('message', function (msg) {
    const msgObj = JSON.parse(msg);
    if (msgObj.type === 'init-ws') {
      const conn = {ws: ws, initData: msgObj};
      connections.push(conn);
      console.log('ws registered: ' + JSON.stringify(msgObj));
    } else {
      console.error('unhandled ws msg: ' + msg);
    }
  });
});

// http-post receive message
app.post('/msg', function (req, res) {
  console.log(req.body);
  res.send({ status: 'OK' })
  res.end("yes");

  // echo msg to clients
  connections.forEach(connection => {
    connection.ws.send(JSON.stringify(req.body));
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

