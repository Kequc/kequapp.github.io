# Bundle Properties

Properties such as `req`, `res`, and `context` are found throughout the examples. These properties are generated for every request and available in every action.

### req

Node's <a href="https://nodejs.org/api/http.html#class-httpclientrequest" target="_blank">ClientRequest</a> object. It is not modified by this framework so we can rely on the official documentation to use it. This represents the client request.

### res

Node's <a href="https://nodejs.org/api/http.html#class-httpserverresponse" target="_blank">ServerResponse</a> object. It is not modified by this framework so we can rely on the official documentation to use it. This represents the server response.

### url

If we need to know more about what the client is looking at in the address bar we can do so here. It is a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) instance generated from the `req` object.

Useful for examining the query string, for example by digging into <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams" target="_blank">searchParams</a>.

```javascript
createRoute({
    method: 'GET',
    url: '/hotels',
    actions: [({ url }) => {
        const page = url.searchParams.get('page');
        const categories = url.searchParams.getAll('categories');

        // page ~= '2'
        // categories ~= ['ac', 'hottub']
    }]
});
```

### methods

An array of methods available in our app at the current url (`GET`, `POST`, `OPTIONS`, etc.).

### context

A place to store variables derived by actions, we might use these variables elsewhere in our code. Changes can be made here whenever we want and it may be populated with anything.

Maybe authentication details, a user object, or any data that's useful in other places.

### params

When defining a route we can specify parameters to extract by prefixing a colon `':'` character in the url. If we specify a route such as `'/users/:userId'` we will have a `params` item called `'userId'`. Use a double asterisk `'/**'` to accept anything for the remainder of the url, this will cause us to have a `params` item called `'wild'`.

Param values are always a string.

### cookies

Includes helpers for `get()`, `set()`, and `remove()`. The `set()` method takes an optional third parameter with `expires`, `maxAge`, `domain`, `path`, `secure`, `httpOnly`, `partitioned`, and `sameSite`.

```javascript
createAction(({ cookies }) => {
    // get a cookie
    const value: string | undefined = cookies.get('MyCookie');
    // set a cookie
    cookies.set('MyCookie', 'NewValue', { maxAge: 10000 });
    // remove a cookie
    cookies.remove('MyCookie');
});
```

### logger

The logger being used by the application.

### getBody

This method can be used in many ways so we will look at it in detail the next section.
