# createErrorHandler

```javascript
import { createErrorHandler } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **contentType \*** | *Content type* | |
| **action \*** | *Action* | |

Error handlers are invoked when an action throws an exception. They turn errors into useful information that is sent to a renderer in place of the expected response.

The first parameter of an error handler is the error that has been thrown, otherwise it is the same as any other action. It can return a value to invoke a renderer or finalize the response. You may make changes to the headers or anything that you need.

The `createErrorHandler` function must specify a content type (`'application/json'`, `'text/html'`, etc.) and an action to manipulate the information into a response.

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

Kequapp will turn any error into json by default, and return a json formatted response. However this behavior can be overriden by writing error handlers of your own that support a more specific content type.
