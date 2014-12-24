'use strict';
var stream = require('stream');
var util = require('util');
var Writable = stream.Writable;

/**
 * the LogStream constructor.
 * it inherits all methods of a writable stream
 * the constructor takes a options object. A important field is the model, the model will
 * be used for saving the log entry to the mongo db instance.
 * @param options
 * @constructor
 */
function LogStream(options) {

    this.model = options.model || false;

    if (!this.model) {
        throw new Error('[LogStream] - Fatal Error - No mongoose model provided!');
    }

    Writable.call(this, options);
}

/**
 * inherits all Writable Stream methods
 */
util.inherits(LogStream, Writable);

/**
 * the _write method must be overridden by this implementation.
 * This method will be called on every write event on this stream.
 * @param chunk
 * @param enc
 * @param cb
 * @returns {*}
 */
LogStream.prototype._write = function (chunk, enc, cb) {

    if (this.model === false) {
        return cb();
    }

    var newLogEntry = new this.model(JSON.parse(chunk.toString()));

    newLogEntry.save(function (err, logEntry) {
        if (err) {
            throw err;
        }
        return cb();
    })
};

/**
 * export the logStream
 * @param options
 * @returns {LogStream}
 */
module.exports = function (options) {

    if (!options) {
        options = {};
    }

    return new LogStream(options);
};

