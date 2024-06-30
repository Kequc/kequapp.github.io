# Logger

One of the options provided to `createBranch()` is a `logger` parameter. The default logger for the application is a simple object with methods for `error`, `warn`, `info`, `http`, `verbose`, `debug`, `silly`, and `log`. Each mapping roughly to console.

Overriding this logger requires an object with some or all of the same methods.
