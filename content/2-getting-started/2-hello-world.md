# Hello World

Here's a simple example to get you started with Kequapp:

```javascript
import { createServer } from 'http';
import { createApp } from 'kequapp';

const app = createApp({
    routes: [
        {
            method: 'GET',
            url: '/',
            handles: [() => 'Hello world!']
        }
    ]
});

createServer(app).listen(4000, () => {
    console.log('Server running at http://localhost:4000');
});
```

This example responds to all 'GET' and 'HEAD' requests made to '/', otherwise a 404 Not Found error will be thrown. The framework comes with a built-in error handler and some renderers, so for now, this is all we need.
