# sendFile

```javascript
import { sendFile } from 'kequapp';
```

The `sendFile` function delivers a file to the client and finalizes the response. This is asynchronous and must be awaited. Otherwise the application might get confused as it continued processing the request unexpectedly.

```javascript
createRoute({
    method: 'GET',
    url: '/db.json',
    actions: [async ({ req, res }) => {
        await sendFile(req, res, '/db/my-db.json');
    }],
});
```

A fourth parameter may be provided defining a `'Content-Type'` this header is otherwise guessed from the file extension.
