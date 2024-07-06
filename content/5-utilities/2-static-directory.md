# staticDirectory

```javascript
import { staticDirectory } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **location \*** | *Directory* | |
| **contentTypes** | *Content types* | `{}` |
| **indexes** | *File names* | `[]` |

The `staticDirectory` function creates an action intended to pair a `'wild'` parameter with a static directory relative to the root of your project. Therefore the `url` should end with `'/**'`.

An array of `indexes`, for example `['index.html']` may be provided to resolve when the request points at a directory.

A `'Content-Type'` header is guessed based on every asset's file extension. If there are assets in the directory with unusual file extensions, then additional `contentTypes` may be provided.

```javascript
const staticAssets = staticDirectory({
    location: '/my-assets-dir',
    contentTypes: {
        '.3gp': 'audio/3gpp',
    },
    indexes: ['index.html'],
});

createRoute({
    method: 'GET',
    url: '/assets/**',
    actions: [staticAssets],
});
```

Additional control can be obtained by using an action.

```javascript
const prepare = createAction(({ res, params }) => {
    res.setHeader('Cache-Control', 'max-age=604800');

    if (params.wild === '/secret.txt') {
        throw Ex.NotFound();
    }
});

createRoute({
    method: 'GET',
    url: '/assets/**',
    actions: [prepare, staticAssets],
});
```
