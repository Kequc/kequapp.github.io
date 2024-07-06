# createApp

```javascript
import { createApp } from 'kequapp';
```

The `createApp` function is the entry point of your application. It prepares your app to handle incoming requests and serves as the main event handler for Node's `createServer` method.

This prepares our application for use as the event handler in Node's `createServer()` method. It is otherwise identical to the `createBranch()` method.

### Example

```javascript
const app = createApp({
    routes: [
        {
            method: 'GET',
            url: '/',
            actions: [() => 'Hello world!']
        }
    ]
});
```
