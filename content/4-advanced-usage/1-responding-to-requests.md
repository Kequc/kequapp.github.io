# Responding to Requests

Any action may terminate a request one of three ways:

1. **Throw an error** - An error handler is invoked.
2. **Return a value** - A renderer is invoked.
3. **Finalize the response**

Finalizing a response is for cases where you need the most control. It allows you to terminate the response any way you need without invoking a renderer.

```javascript
const loggedIn = createAction(({ req, res }) => {
    // must be authenticated!

    if (!req.headers.authorization) {
        // cause redirect
        res.statusCode = 302;
        res.setHeader('Location', '/login');

        // finalize response to ignore remaining actions
        res.end();
    }
});

const setJson = createAction(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
});

createRoute({
    method: 'GET',
    url: '/api/users',
    actions: [loggedIn, setJson, () => {
        // return a value to invoke a renderer
        return {
            users: [{ name: 'April' }, { name: 'Leo' }]
        };
    }],
});
```

In this example if the client did not provide an `'authorization'` header, the `loggedIn` action will finalize the response. This terminates the request and skips all remaining actions.

Otherwise the `setJson` action sets the `'Content-Type'` of the response to `'application/json'`.

The last remaining action returns a value. This invokes a renderer best matching the `'Content-Type'` header, in this example a renderer matching `'application/json'` will be used.

The appropriate renderer will finalize a response to the client. If an error was thrown then an error handler best matching the `'Content-Type'` header would intercept the response.
