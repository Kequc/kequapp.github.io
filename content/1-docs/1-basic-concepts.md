# Basic Concepts

Understanding the core concepts of Kequapp will help you build applications efficiently and effectively. Here are the fundamental components that make up the Kequapp framework:

## createApp()

The `createApp` function is the entry point of your application. It prepares your app to handle incoming requests and serves as the main event handler for Node's `createServer` method.

```javascript
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
```

## createBranch()

The `createBranch` function allows you to organize your routes and middleware into logical sections, or branches. Each branch can have its own set of routes, handles, error handlers, and renderers.

```javascript
import { createBranch } from 'kequapp';

const userBranch = createBranch({
    url: '/users',
    routes: [
        {
            method: 'GET',
            url: '/',
            handles: [() => ({ users: [] })]
        }
    ]
});
```

## createRoute()

Routes define the endpoints of your application. Each route specifies a method (`GET`, `POST`, etc.) and a URL. Routes are the building blocks of your application's API.

```javascript
import { createRoute } from 'kequapp';

const getUserRoute = createRoute({
    method: 'GET',
    url: '/users/:id',
    handles: [({ params }) => ({ userId: params.id })]
});
```

## createHandle()

Handles are functions that process requests. They can modify the request and response objects, perform authentication, validation, or any other processing needed. Handles are executed in sequence.

```javascript
import { createHandle } from 'kequapp';

const jsonHandle = createHandle(({ res }) => {
    res.setHeader('Content-Type', 'application/json');
});
```

## createErrorHandler()

Error handlers are invoked when a handle throws an exception. They turn errors into useful information that is sent to the client. You can create custom error handlers to provide better error responses.

```javascript
import { createErrorHandler } from 'kequapp';

const textErrorHandler = createErrorHandler({
    contentType: 'text/*',
    handle: (ex, { url }) => `${url.pathname} ${ex.statusCode}: ${ex.message}`
});
```

## createRenderer()

Renderers are responsible for finalizing the response to the client. When a handle returns a value, a renderer is invoked to send the response. You can create custom renderers for different content types.

```javascript
import { createRenderer } from 'kequapp';

const htmlRenderer = createRenderer({
    contentType: 'text/html',
    handle: (payload, { req, res }) => {
        const html = myMarkupRenderer(payload);

        res.setHeader('Content-Length', Buffer.byteLength(html));

        // finalize response
        if (req.method === 'HEAD') {
            res.end();
        } else {
            res.end(html);
        }
    }
});
```

Understanding these core concepts will help you build robust and scalable applications with Kequapp. As you explore the documentation, you'll find more details and examples to guide you through each feature.

Happy coding!
