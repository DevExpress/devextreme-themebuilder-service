"use strict";

const builder = require("devextreme-themebuilder/modules/builder");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const express = require("express");
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/buildtheme', (req, res) => {
    builder.buildTheme(req.body)
        .then((result) => {
            res.json(result);
        }, (err) => {
            res.status(500).send(err);
        }) 
});

module.exports.run = () => {
    app.listen(3000);
}
