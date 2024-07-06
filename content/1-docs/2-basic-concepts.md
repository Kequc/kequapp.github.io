# Basic Concepts

Understanding the core concepts of Kequapp will help you build applications efficiently and effectively. Here are the fundamental components that make up the Kequapp framework:

### Content Type

The `'Content-Type'` header has a huge impact on the way your application responds. Based on this header Kequapp determines which error handler to use, and which renderer to use.

This structure helps to ensure that the correct `'Content-Type'` is being returned whenever possible. A user expecting to see a `'application/json'` response instead of a `'text/html'` response will probably get one.

Be sure to set your `'Content-Type'` header deliberately and make use of error handlers and renderers that are set up to take advantage of this.

### Branches

The `createApp` function acts as the trunk of the tree where all behaviors derive. It is effectively a branch that stems from `'/'` and is a great place to add functionality that will effect the whole application.

The app can have branches added using `createBranch` that also resolve to `'/'`, branches are not overridden. In the background all route endpoints are sorted and cataloged upon app startup.

Therefore branching your application with different functionality and same urls is fine.

Even if you have many branches with similar urls containing many routes with different bahavior, Kequapp will sort this out behind the scenes. Duplicate routes however will give you a warning. The final result of your app should contain routes that are unique either by url or method (`GET`, `POST`, etc.) so that there is no conflict.

### Actions

The `createAction` function is simply a wrapper for a function, for cases where you find yourself writing functionality outside the scope of a branch. This is to provide types, but ultimately a function is an action.

Actions are littered throughout your application's code base and define the vast majority of your application's behavior. These can be asyncronous and always run in sequence. They are used to check authorization, change response headers, render a response, and more. Most of your code will be wrapped in many different actions.

It serves to break up your code and make it reusable. Each action comes with many bundle properties that make it easy to manage a web application.

### CORS

Kequapp is the only JavaScript web framework we are aware of that correctly responds to `OPTIONS` requests. What's more, it still gives you additional control to suit your needs. This is an example of where the structure of this framework shines.

Every request your application receives knows what matching routes exist at that url. This is what `OPTIONS` responses are supposed to communicate to the client.

If you need CORS in your application you'll be able to handle those requests as intended.

### Body

Many route endpoints do not even care about the body of a request. The `getBody` function is a helper tool that will retrieve that data. It is used inline and awaited in Kequapp, giving you a lot of control over what it is doing.

If your application makes use of the body of requests in a unique way this framework has you covered. From field validation, processing and formatting incoming data, to allowing you to do it all yourself. Take advantage of the speed gained from not needing to parse the body of a request up front.

### You're all set

Understanding these core concepts will help you build robust and scalable applications with Kequapp. As you explore the documentation, you'll find more details and examples to guide you through each feature.

Thank you for trying our framework we hope it's as enjoyable for you as it is for myself!
