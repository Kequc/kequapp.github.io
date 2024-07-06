# Logger

One of the options provided to `createBranch` is a `logger` parameter.

The default logger for the application is a simple object with methods for `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`, and `log` which each map roughly to console. Overriding this logger requires an object with some or all of the same methods.

The logger is available in all actions using the `logger` property.

This is where you may elect to make some logging silent for example the `http` logger is used whenever a request is resolved.
