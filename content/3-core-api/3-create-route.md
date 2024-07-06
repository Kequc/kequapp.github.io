# createRoute

```javascript
import { createRoute } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **method \*** | *Method* | |
| **url \*** | *Pathname* | |
| **actions** | *Sequence* | `[]` |
| **logger** | *Logger* | `console` |
| **autoHead** | *HEAD request* | `true` |

A route must specify a method (`'GET'`, `'POST'`, etc.) and a url. The url is a pathname that the route should respond to and must always start with `'/'`.

### Example

```javascript
createRoute({
    method: 'POST',
    url: '/admin/users',
    actions: [loggedIn, () => 'User created!']
});
```

This example has two actions. One called `loggedIn()`, then a second that returns a value which is therefore delivered to a renderer.
