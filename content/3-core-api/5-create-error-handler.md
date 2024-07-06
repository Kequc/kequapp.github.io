# createErrorHandler

```javascript
import { createErrorHandler } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **contentType \*** | *Content type* | |
| **action \*** | *Action* | |

Error handlers are invoked when an action throws an exception. They turn errors into useful information that is sent to a renderer in place of the expected response.

The `createErrorHandler` function must specify a `contentType` (`'application/json'`, `'text/html'`, etc.) and an `action` to manipulate the information into a response.

The first parameter of an error handler is the error `ex` that has been thrown, after that it is the same as any action. It can return a value to invoke a renderer, finalize the response, change headers, or anything that you need.

### Example

```javascript
createErrorHandler({
    contentType: 'text/*',
    action: (ex, { url }) => {
        return `${url.pathname} ${ex.statusCode}: ${ex.message}`;
    }
});
```

Errors thrown within an error handler or the renderer it invokes will cause a fatal exception and an empty `body` will be delivered to the client.

For a good example of how to write an error handler see this repo's <a href="https://github.com/Kequc/kequapp/tree/main/src/built-in" target="_blank">/src/built-in</a> directory.

Kequapp will turn any error into json by default, and return a json formatted response. However this behavior can be overriden by writing your own error handlers that support more specific content types.
