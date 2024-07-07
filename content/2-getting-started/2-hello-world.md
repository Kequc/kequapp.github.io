# Hello World

### server.js

```javascript
import { createServer } from 'http';
import app from './app';

createServer(app).listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
```

### app.js

```javascript
import { createApp } from 'kequapp';

export default createApp({
    routes: [
        {
            method: 'GET',
            url: '/',
            actions: [() => 'Hello world!'],
        },
    ],
});
```

### Outcome

This example responds to all `GET` and `HEAD` requests made to `'/'` at the base of your application, otherwise a `404 Not Found` error will be thrown.

Kequapp comes with a built-in error handler and some renderers, so for now this is all you need.