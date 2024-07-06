# Installation

To install Kequapp, run the following command:

```
npm i kequapp
```

It is good practice to make both a `server.js` file and `app.js` file, to keep concerns separated. Use `server.js` as your entry point to the application and access `app.js` for testing purposes.

### package.json

```
{
    "scripts": {
        "start": "node ./server.js"
    }
}
```

If you like, <a href="https://www.npmjs.com/package/nodemon" target="_blank">nodemon</a> can be used instead to restart the server automatically whenever code changes are made.
