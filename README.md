# Bunyan MongoDB Stream

A stream implementation for the bunyan logger (node-bunyan). All log entries will be saved directly to your mongodb
instance. It is a very lower level implementation and has no external dependencies.

The implementation requires a mongoose model for saving the log-data to the database. 
 
