# createBranch

```javascript
import { createBranch } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **url** | *Pathname* | `'/'` |
| **handles** | *Sequence* | `[]` |
| **logger** | *Logger* | `console` |
| **autoHead** | *HEAD request* | `true` |
| **routes** | *Routes* | `[]` |
| **branches** | *Branches* | `[]` |
| **errorHandlers** | *Error handlers* | `[]` |
| **renderers** | *Renderers* | `[]` |

A branch of the application will distribute the given options, handles, error handlers, and renderers through a section of branches and routes.

### Example

```javascript
createBranch({
    branches: [
        {
            url: '/api/users',
            handles: [json],
            routes: [
                {
                    method: 'GET',
                    url: '/',
                    handles: [() => ({ result: [] })]
                },
                {
                    method: 'GET',
                    url: '/:id',
                    handles: [({ params }) => ({ userId: params.id })]
                }
            ]
        }
    ],
    routes: [
        {
            method: 'GET',
            url: '/admin/dashboard',
            handles: [loggedIn, ({ context }) => `Hello admin ${context.auth}`]
        }
    ]
});
```
