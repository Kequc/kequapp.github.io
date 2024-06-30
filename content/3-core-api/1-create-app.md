# createApp

```javascript
import { createApp } from 'kequapp';
```

This prepares our application for use as the event handler in Node's `createServer()` method. It is otherwise identical to the `createBranch()` method.

### Example

```javascript
const app = createApp({
    routes: [
        {
            method: 'GET',
            url: '/',
            handles: [() => 'Hello world!']
        }
    ]
});
```
