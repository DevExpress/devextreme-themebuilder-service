"use strict";

const builder = require("devextreme-themebuilder/modules/builder");
const metadata = require("devextreme-themebuilder/data/metadata/dx-theme-builder-metadata").metadata;
const baseParameters = require("devextreme-themebuilder/modules/base-parameters");
const themes = require("devextreme-themebuilder/modules/themes").default;
const version = require("devextreme-themebuilder/package.json").version;
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

app.get('/themes', (req, res) => {
    if(!themes) res.status(500).send({ err: 'No themes' });
    res.status(200).send(themes);
});

app.get('/metadata', (req, res) => {
    if(!metadata) res.status(500).send({ err: 'No metadata' });

    if(version) {
        metadata.version = version
    }

    if(baseParameters) {
        metadata.baseParameters = baseParameters;
    }

    res.status(200).send(metadata);
});

app.post('/buildtheme', (req, res) => {
    builder.buildTheme(req.body)
        .then((result) => {
            res.json(result);
        }, (err) => {
            res.status(500).send(err);
        })
});

module.exports.run = (port) => {
    port = port || 3000;
    app.listen(port);
    console.log(`Open http://localhost:${port}`);
}
