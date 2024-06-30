# createHandle

```javascript
import { createHandle } from 'kequapp';
```

A simple wrapper for a handle the purpose of which is to provide types.

### Example

```javascript
const json = createHandle(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
});

const loggedIn = createHandle(({ req, context }) => {
    if (req.headers.authorization !== 'mike') {
        throw Ex.Unauthorized();
    }
    context.auth = req.headers.authorization;
});
```

In these examples the `json()` handle sets the `'Content-Type'` header to `'application/json'`, and the `loggedIn()` handle checks for an `'authorization'` header from the client. Handles can be asyncronous and always run in sequence.
