"use strict";

if(process.platform === 'linux') {
    process.env.PATH = `${process.env.PATH}:/usr/lib/dart/bin`;
}

if(process.argv[2] === '--debug') {
    process.env.THEMEBUILDER_DEBUG = true;
}

const DartClient = require('devextreme-themebuilder/modules/dart-client').default;
const dartServerRunner = require('devextreme-themebuilder/dart-compiler/run');
const service = require("./index.js");

const dartClient = new DartClient();

const checkAndRestart = async() => {
    try {
        await dartClient.check();
        if(!dartClient.isServerAvailable) {
            dartServerRunner.run(true);
        }
        await dartClient.send({ keepAlive: true });
    } catch(e) {}
};

setInterval(checkAndRestart, 60000);

dartServerRunner.run().catch().finally(service.run);
