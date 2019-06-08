const express = require('express');
const app = express();
const expressWs = require('express-ws');
const bodyParser = require("body-parser"); // for http-post
const cors = require('cors'); // cross-site rules
expressWs(app);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = 3001;
const store = require('./store.js');

// serve build-dir as static files
app.use(express.static('../build'))

// http-post receive login
app.post('/', function (req, res) {
  res.send({ 
    username: req.body.username, 
    channel: store.defaultChannel,
    messages: store.getMsg(store.defaultChannel) 
  });
  res.end("yes");
});

// websocket init
app.ws('/ws', function (ws, req) {
  ws.on('message', function (msg) {
    const msgObj = JSON.parse(msg);
    if (msgObj.type === 'init-ws') {
      store.saveConnection(ws, msgObj.username, msgObj.channel);      
    } else {
      console.error('unhandled ws msg: ' + msg);
    }
  });
});

// http-post receive msg / websocket forward msg
app.post('/msg', function (req, res) {
  console.log(req.body);
  res.send({ status: 'OK' })
  res.end("yes");

  store.getConnections.forEach(c => {
    c.websocket.send(JSON.stringify(req.body));
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

