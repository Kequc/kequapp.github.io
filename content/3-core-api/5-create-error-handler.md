# createErrorHandler

```javascript
import { createErrorHandler } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **contentType \*** | *Content type* | |
| **action \*** | *Handler* | |

An appropriate error handler is invoked whenever an action throws an exception.

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
