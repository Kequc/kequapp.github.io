# createRenderer

```javascript
import { createRenderer } from 'kequapp';
```

| key | description | default |
| ---- | ---- | ---- |
| **contentType \*** | *Content type* | |
| **action \*** | *Action* | |

Renderers are responsible for finalizing the response to the client. When an action returns a value, a renderer is invoked to send the response. You can create custom renderers for different content types.

The `createRenderer` function must specify a content type (`'application/json'`, `'text/html'`, etc.) and an action to manipulate the information into a response.

The first parameter of an renderer is the value that was returned. Here is a simple example of an HTML renderer:

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

For good examples of how to write a renderer see this repo's <a href="https://github.com/Kequc/kequapp/tree/main/src/built-in" target="_blank">/src/built-in</a> directory.

Kequapp comes with a renderer for `'application/json'` and `'text/*'`, however these can be overriden by writting renderers of your own with those content types.
