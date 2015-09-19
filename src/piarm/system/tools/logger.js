/*
 |--------------------------------------------------------------------------
 | Created by Julien Vincent
 |--------------------------------------------------------------------------
 **/

var log4js = require('log4js');
var settings = require('../../env.js');

module.exports.getLogger = function (name) {
    var logger = log4js.getLogger(name);
    logger.setLevel(settings.logLevel);
    return logger;
};