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

function createMetadata() {
    const result = metadata;

    if(themes) {
        result.themes = themes;
    }

    if(version) {
        result.version = version
    }

    if(baseParameters) {
        result.baseParameters = baseParameters;
    }

    return result;
}

const currentMetadata = createMetadata();

app.get('/metadata', (req, res) => {
    if(!currentMetadata) res.status(500).send({ err: 'No metadata' });

    res.status(200).send(currentMetadata);
});

app.post('/buildtheme', (req, res) => {
    builder.buildTheme(req.body)
        .then((result) => {
            res.json(result);
        }, (err) => {
            res.status(500).send(err);
        })
});

module.exports.run = (port = 3000) => {
    app.listen(port);
    console.log(`Open http://localhost:${port}`);
}
