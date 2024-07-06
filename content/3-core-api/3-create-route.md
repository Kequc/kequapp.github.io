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

Routes define the endpoints of your application.

The `createRoute` function must specify a method (`GET`, `POST`, etc.) and a url. The url is a pathname that the route should respond to and must always start with `'/'`. Actions are a list of functions that should be executed in order when the endpoint is accessed.

### Example

```javascript
createRoute({
    method: 'POST',
    url: '/admin/users',
    actions: [loggedIn, () => 'User created!']
});
```

This example has two actions. One called `loggedIn()`, then a second that returns a value which is therefore delivered to a renderer.
