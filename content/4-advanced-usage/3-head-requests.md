# HEAD Requests

By default, if a HEAD request has no matching route, our application will use a matching GET route in its place. Therefore it is important to keep in mind that HEAD requests follow the same flow as GET requests in our application.

Occasionally, we may need to differentiate between the two as it is generally understood that a HEAD request does not modify data. In this case, looking at the value of req.method can be useful.

```javascript
createRoute({
    method: 'GET',
    url: '/api/users',
    handles: [({ req }) => {
        if (req.method === 'HEAD') {
            // head request
        }
    }]
});
```

In most cases, HEAD and GET requests should run the same code, so we have nothing to worry about. Detection of HEAD requests is already handled by the renderers that are built-in to the framework. Largely what will happen is no body will be sent to the client, which is what a HEAD request wanted.
