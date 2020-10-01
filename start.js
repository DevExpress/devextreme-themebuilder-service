"use strict";

if(process.platform === 'linux') {
    process.env.PATH = `${process.env.PATH}:/usr/lib/dart/bin`;
}

const dartServerRunner = require('devextreme-themebuilder/dart-compiler/run');
const service = require("./index.js");

dartServerRunner.run().finally(service.run);
