# createBranch

```javascript
import { createBranch } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **url** | *Pathname* | `'/'` |
| **actions** | *Sequence* | `[]` |
| **logger** | *Logger* | `console` |
| **autoHead** | *HEAD request* | `true` |
| **routes** | *Routes* | `[]` |
| **branches** | *Branches* | `[]` |
| **errorHandlers** | *Error handlers* | `[]` |
| **renderers** | *Renderers* | `[]` |

The `createBranch` function allows you to organize your routes into logical sections, or branches. Each branch can have its own set of routes, actions, error handlers, and renderers.

A branch of the application will distribute the given options, actions, error handlers, and renderers through a section of branches and routes.

### Example

```javascript
createBranch({
    branches: [
        {
            url: '/api/users',
            actions: [setJson],
            routes: [
                {
                    method: 'GET',
                    url: '/',
                    actions: [() => ({ result: [] })]
                },
                {
                    method: 'GET',
                    url: '/:id',
                    actions: [({ params }) => ({ userId: params.id })]
                }
            ]
        }
    ],
    routes: [
        {
            method: 'GET',
            url: '/admin/dashboard',
            actions: [loggedIn, ({ context }) => `Hello admin ${context.auth}`]
        }
    ]
});
```
