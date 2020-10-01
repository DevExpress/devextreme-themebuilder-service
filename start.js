"use strict";

const dartServerRunner = require('devextreme-themebuilder/dart-compiler/run');
const service = require("./index.js");

dartServerRunner.run().finally(service.run);

