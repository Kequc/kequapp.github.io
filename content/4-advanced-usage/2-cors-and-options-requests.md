# CORS and OPTIONS Requests

CORS behavior is managed by headers as shaped by actions. The framework will automatically add default headers we can use for basic support.

To enable CORS, our application needs to respond to preflight requests, therefore we define an `OPTIONS` route. By default, any url that has a matching `OPTIONS` route is decorated with `'Access-Control-Allow-Origin'` with a value of `'*'`. This alone is enough to handle the majority of CORS-related cases and functionality.

```javascript
createApp({
    routes: [
        {
            method: 'OPTIONS',
            url: '/**'
        }
    ]
});
```

The framework automatically attaches four additional headers to `OPTIONS` responses. `'Valid'` and `'Access-Control-Allow-Methods'` will correctly identify all methods available at the requested url. `'Access-Control-Allow-Headers'` will return headers that the client specified. `'Content-Length'` will be `0`.

In addition, the default response code for `OPTIONS` requests is `204`. To change any of this behavior or add more headers to `OPTIONS` responses, we use an action.

```javascript
createApp({
    routes: [
        {
            method: 'OPTIONS',
            url: '/**',
            actions: [({ res }) => {
                res.setHeader('Access-Control-Max-Age', 86400);
                res.setHeader('Vary', 'Access-Control-Request-Headers');
            }]
        }
    ]
});
```

As `OPTIONS` responses do not need to include a body, we can safely leave the route like this without rendering.

The simplest place to override `'Access-Control-Allow-Origin'` is at the base of the application but we may adjust this as needed. The `createApp` method accepts actions and is a convenient place to set global headers.

```javascript
const strictCors = createAction(({ res, methods }) => {
    if (methods.includes('OPTIONS')) {
        res.setHeader('Access-Control-Allow-Origin', 'https://foo.com');
    }
});

createApp({
    actions: [strictCors]
});
```

This would cause all responses to include `'Access-Control-Allow-Origin'` but only if there is an `OPTIONS` route; one should be included for the mechanism to work correctly.

Please see the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">MDN documentation on CORS</a> for more information about headers that the client expects to see.
