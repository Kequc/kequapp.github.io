# Ex

```javascript
import { Ex } from 'kequapp';
```

An unhandled exception from our application results in a 500 Internal Server Error. If we would like an error with a different status code, there is a helper tool for that.

```javascript
createRoute({
    method: 'GET',
    url: '/throw-error',
    handles: [() => {
        throw Ex.NotFound();
        throw Ex.NotFound('Custom message', { extra: 'info' });
        // same as
        throw Ex.StatusCode(404);
        throw Ex.StatusCode(404, 'Custom message', { extra: 'info' });
    }]
});
```

This makes it easy to utilize any status code 400 and above. These methods create errors with correct stack traces we can throw directly without the use of new.

| Error Name | Status Code | Message |
| ---- | ---- | ---- |
| BadRequest | 400 | Bad Request |
| Unauthorized | 401 | Unauthorized |
| PaymentRequired | 402 | Payment Required |
| Forbidden | 403 | Forbidden |
| NotFound | 404 | Not Found |
| MethodNotAllowed | 405 | Method Not Allowed |
| NotAcceptable | 406 | Not Acceptable |
| ProxyAuthenticationRequired | 407 | Proxy Authentication Required |
| RequestTimeout | 408 | Request Timeout |
| Conflict | 409 | Conflict |
| Gone | 410 | Gone |
| LengthRequired | 411 | Length Required |
| PreconditionFailed | 412 | Precondition Failed |
| PayloadTooLarge | 413 | Payload Too Large |
| URITooLong | 414 | URI Too Long |
| UnsupportedMediaType | 415 | Unsupported Media Type |
| RangeNotSatisfiable | 416 | Range Not Satisfiable |
| ExpectationFailed | 417 | Expectation Failed |
| ImATeapot | 418 | I'm a teapot |
| MisdirectedRequest | 421 | Misdirected Request |
| UnprocessableEntity | 422 | Unprocessable Entity |
| Locked | 423 | Locked |
| FailedDependency | 424 | Failed Dependency |
| TooEarly | 425 | Too Early |
| UpgradeRequired | 426 | Upgrade Required |
| PreconditionRequired | 428 | Precondition Required |
| TooManyRequests | 429 | Too Many Requests |
| RequestHeaderFieldsTooLarge | 431 | Request Header Fields Too Large |
| UnavailableForLegalReasons | 451 | Unavailable For Legal Reasons |
| InternalServerError | 500 | Internal Server Error |
| NotImplemented | 501 | Not Implemented |
| BadGateway | 502 | Bad Gateway |
| ServiceUnavailable | 503 | Service Unavailable |
| GatewayTimeout | 504 | Gateway Timeout |
| HTTPVersionNotSupported | 505 | HTTP Version Not Supported |
| VariantAlsoNegotiates | 506 | Variant Also Negotiates |
| InsufficientStorage | 507 | Insufficient Storage |
| LoopDetected | 508 | Loop Detected |
| BandwidthLimitExceeded | 509 | Bandwidth Limit Exceeded |
| NotExtended | 510 | Not Extended |
| NetworkAuthenticationRequired | 511 | Network Authentication Required |
