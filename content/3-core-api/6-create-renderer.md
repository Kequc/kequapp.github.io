# createRenderer

```javascript
import { createRenderer } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **contentType \*** | *Content type* | |
| **action \*** | *Handler* | |

An appropriate renderer is invoked whenever an action returns a value apart from undefined. We may return a value to invoke a renderer or finalize the response ourselves directly, which skips this step.

Here is a simple example of an HTML renderer:

```javascript
createRenderer({
    contentType: 'text/html',
    action: (payload, { req, res }) => {
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

For good examples of how to write a renderer see this repo's /src/built-in directory.
