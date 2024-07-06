# inject

```javascript
import { inject } from 'kequapp';
```

We may unit test our application without starting a server by using the `inject` tool. The first parameter is our app, then options used to populate the request.

The returned `req` value is a simulation of Node's built-in <a href="https://nodejs.org/api/http.html#class-httpclientrequest" target="_blank">ClientRequest</a> object and is a Transform stream. The returned `res` value is a simulation of Node's built-in <a href="https://nodejs.org/api/http.html#class-httpserverresponse" target="_blank">ServerResponse</a> object and is also a Transform stream. The returned `getResponse` tool waits for our application to finish processing, and parses the response. It is very similar to `getBody` as described earlier. We could inspect what our application is doing using the `req` and `res` objects in real-time instead if that's what we need.

```javascript
it('reads the authorization header', async () => {
    const { getResponse, res } = inject(app, {
        url: '/admin/dashboard',
        headers: {
            Authorization: 'mike',
        },
    });

    const body = await getResponse();

    assert.strictEqual(res.getHeader('Content-Type'), 'text/plain');
    assert.strictEqual(body, 'Hello admin mike!');
});
```

All requests are automatically finalized when using `inject` unless the `body` parameter is set to `null`. Doing this will allow us to write to the stream in cases where more precise testing is necessary.

The following two examples are the same.

```javascript
const { getResponse } = inject(app, {
    method: 'POST',
    url: '/users',
    headers: {
        'Content-Type': 'application/json'
    },
    body: '{ "name": "April" }',
});

const body = await getResponse();
```

```javascript
const { getResponse, req } = inject(app, {
    method: 'POST',
    url: '/users',
    headers: {
        'Content-Type': 'application/json',
    },
    body: null,
});

// finalize request
req.end('{ "name": "April" }');

const body = await getResponse();
```

Note that `getResponse` will not resolve until the request is finalized.
