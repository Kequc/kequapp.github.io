# staticDirectory

```javascript
import { staticDirectory } from 'kequapp';
```

Pairs a wild parameter with a static directory relative to the root of our project.

```javascript
// staticDirectory

const staticAssets = staticDirectory({
    location: '/my-assets-dir',
    contentTypes: {
        '.3gp': 'audio/3gpp'
    }
});

createApp({
    routes: [
        {
            method: 'GET',
            url: '/assets/**',
            handles: [staticAssets]
        }
    ]
});
```

The url should end with '/**' capturing all possible paths.

A 'Content-Type' header is guessed based on every asset's file extension. If there are assets in the directory with unusual file extensions, then additional contentTypes may be provided. Exclusions can be provided if we want to ignore certain requests, or headers for assets can be set by using a handle.

An array of index files, for example ['index.html'], may be provided to resolve when the location is a directory.

```javascript
// staticDirectory

const prepare = createHandle(({ res, params }) => {
    res.setHeader('Cache-Control', 'max-age=604800');

    if (params.wild === '/secret.txt') {
        throw Ex.NotFound();
    }
});

createApp({
    routes: [
        {
            method: 'GET',
            url: '/assets/**',
            handles: [prepare, staticAssets]
        }
    ]
});
```
