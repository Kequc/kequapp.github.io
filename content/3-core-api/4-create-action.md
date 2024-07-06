# createAction

```javascript
import { createAction } from 'kequapp';
```

Actions are functions that process requests. They can modify the request and response objects, perform authentication, validation, or any other processing needed. Actions can be asyncronous and are executed in sequence.

These are fundamental to the structure of your application and you should create as many of them as you need. Any action that throws an error will invoke an error handler and one that returns a value will invoke a renderer.

The `createAction` function acts as a wrapper for a function the purpose of which is to provide it types.

### Example

```javascript
const setJson = createAction(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
});

const loggedIn = createAction(({ req, context }) => {
    if (req.headers.authorization !== 'mike') {
        throw Ex.Unauthorized();
    }

    context.auth = req.headers.authorization;
});
```

In these examples the `setJson` action sets the `'Content-Type'` header to `'application/json'`, and the `loggedIn` action checks for an `'authorization'` header.
