# sendFile

```javascript
import { sendFile } from 'kequapp';
```

Sends a file and finalizes the response.

This is asynchronous and must be awaited; otherwise, the application might get confused as it continues processing the request unexpectedly.

```javascript
const serveDb = createAction(async ({ req, res }) => {
    await sendFile(req, res, '/db/my-db.json');
});

createApp({
    routes: [
        {
            method: 'GET',
            url: '/db.json',
            actions: [serveDb],
        }
    ]
});
```

A fourth parameter may be provided defining a 'Content-Type'; this header is otherwise guessed from the file extension.
