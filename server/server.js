const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const port = 3001;

let messages = [{date: "12:23 1.2.2019", username: 'kari', text: 'kova ääni'}, 
                {date: "12:23 1.2.2019", username: 'jari', text: 'kari'}];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({username: "username"}));

app.post('/', function (req, res) {
    var username = req.body.username;
    console.log("User name = " + username);
    res.send({username: username, success: true, messages: messages});
    res.end("yes");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));