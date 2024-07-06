# createAction

```javascript
import { createAction } from 'kequapp';
```

A simple wrapper for an action the purpose of which is to provide types.

### Example

```javascript
const json = createAction(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
});

const loggedIn = createAction(({ req, context }) => {
    if (req.headers.authorization !== 'mike') {
        throw Ex.Unauthorized();
    }
    context.auth = req.headers.authorization;
});
```

In these examples the `json()` action sets the `'Content-Type'` header to `'application/json'`, and the `loggedIn()` action checks for an `'authorization'` header from the client. actions can be asyncronous and always run in sequence.
