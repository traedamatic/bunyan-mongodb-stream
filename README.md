# Bunyan MongoDB Stream

A stream implementation for the bunyan logger (https://github.com/trentm/node-bunyan). All log entries will be saved directly to your mongodb
instance. It is a very lower level implementation and has no external dependencies.

The implementation requires a mongoose model for saving the log-data in the mongodb instance.

# Install
 
```
npm install bunyan-mongodb-stream
```
 
# How To

1. Install the npm bunyan-mongodb-stream package. ;)
2. First to need to create a mongoose model. The package does not include a default model because the schema of the log-entry model.

**Example Model**

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

var LogEntryModel = mongoose.model('Log', LogEntrySchema);
```
2. Require and initialize the bunyan-mongodb-stream package.

```javascript
var LogEntryStream = require('bunyan-mongodb-stream')({model: LogEntryModel});
```

3. Set up the bunyan logger

```javascript

var bunyan = require('bunyan');

var logger = bunyan.createLogger({
    name: 'YourLogger',
    streams: [
        {
            stream: LogEntryStream
        }
    ],
    serializers: bunyan.stdSerializers
});

```

4. Use the logger as you already known.


 
