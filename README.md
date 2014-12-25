# Bunyan MongoDB Stream

A stream implementation for the bunyan logger (https://github.com/trentm/node-bunyan). All log entries will be saved directly to your mongodb
instance. It is a very lower level implementation and has no external dependencies.

The implementation requires a mongoose model for saving the log-data in the mongodb instance.

# Install
 
```
npm install bunyan-mongodb-stream
```
 
# How To

1. First to need to create a mongoose model. The package does not include a default model because the schema of the log-entry model.

## Example

```javascript

'use strict';
var mongoose = require('mongoose');

/**
 * The schema of the log entry
 * @type {Mongoose.Schema}
 */
var LogEntrySchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    res : {
        type: Object
    },
    req : {
        type: Object
    }
});

module.exports = mongoose.model('Log', LogEntrySchema);


```



 
