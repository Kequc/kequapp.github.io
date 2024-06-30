# Ex

```javascript
import { Ex } from 'kequapp';
```

An unhandled exception from our application results in a 500 Internal Server Error. If we would like an error with a different status code, there is a helper tool for that.

```javascript
// Ex

createRoute({
    method: 'GET',
    url: '/throw-error',
    handles: [() => {
        throw Ex.NotFound();
        throw Ex.NotFound('Custom message', { extra: 'info' });
        // same as
        throw Ex.StatusCode(404);
        throw Ex.StatusCode(404, 'Custom message', { extra: 'info' });
    }]
});
```

This makes it easy to utilize any status code 400 and above. These methods create errors with correct stack traces we can throw directly without the use of new.
