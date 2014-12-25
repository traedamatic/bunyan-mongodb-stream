# Bunyan MongoDB Stream

A stream implementation for the bunyan logger (https://github.com/trentm/node-bunyan). All log entries will be saved directly to your mongodb
instance. It is a very lower level implementation and has no external dependencies.

The implementation requires a mongoose model for saving the log-data in the mongodb instance.

# Install
 
```
npm install bunyan-mongodb-stream
```
or

```
npm install bunyan-mongodb-stream --save
```

# How To

* Install the npm bunyan-mongodb-stream package. ;)
* First to need to create a mongoose model. The package does not include a default model because the schema of the log-entry model. 
You can add customer fields to mongodb document, just add the field to the schema and pass it to the bunyan logger. More information 
custom fields look here: https://github.com/trentm/node-bunyan#log-method-api


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
* Require and initialize the bunyan-mongodb-stream package.

```javascript
var LogEntryStream = require('bunyan-mongodb-stream')({model: LogEntryModel});
```

* Set up the bunyan logger

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

* Use the logger as you already do.

# Further Reading

For more details about the bunyan logger go to the github account: https://github.com/trentm/node-bunyan

 
