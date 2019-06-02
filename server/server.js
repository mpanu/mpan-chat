const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const cors = require('cors');

const port = 3001;

// https://codeforgeek.com/handle-get-post-request-express-4/

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({username: "username"}));

app.post('/', function (req, res) {
    var username = req.body.username;
    console.log("User name = " + username);
    res.send({username: username, success: true});
    res.end("yes");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));