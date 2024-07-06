# getBody

Node delivers the body of a request in chunks.

It is not necessary to wait for the request to finish before we begin processing it. In most cases, we just want the data and therefore a helper method `getBody()` is provided which we may use to await body parameters from the completed request.

```javascript
createRoute({
    method: 'POST',
    url: '/users',
    actions: [async ({ getBody }) => {
        const body = await getBody();

        // body ~= {
        //     name: 'April'
        // }

        return \`User creation \${body.name}!\`;
    }]
});
```

It takes an options object which can be used to parse and normalize a client request into useful data in a large assortment of different ways.

### multipart

Causes the method to return both `body` and `files`. If the client didn't send any files, or it wasn't a multipart request the second parameter will be an empty array.

```javascript
createRoute({
    method: 'POST',
    url: '/users',
    actions: [async ({ getBody }) => {
        const [body, files] = await getBody({ multipart: true });

        // body ~= {
        //     name: 'April'
        // }
        // files ~= [{
        //     headers: {
        //         'content-disposition': 'form-data; name="avatar" filename="my-cat.png"',
        //         'content-type': 'image/png;'
        //     },
        //     contentType: 'image/png',
        //     name: 'avatar',
        //     filename: 'my-cat.png',
        //     data: Buffer <...>
        // }]

        return \`User creation \${body.name}!\`;
    }]
});
```

### raw

Causes the body to be processed as minimally as possible and return a single buffer. This is especially useful when our application expects a content type other than `'application/x-www-form-urlencoded'`, `'application/json'`, or `'multipart/form-data'`.

```javascript
createRoute({
    method: 'POST',
    url: '/users',
    actions: [async ({ getBody }) => {
        const data = await getBody({ raw: true });

        // data ~= Buffer <...>

        return 'Image received!';
    }]
});
```

When combined with `multipart`, the body is parsed into an array of separate buffers with their respective headers.

```javascript
createRoute({
    method: 'POST',
    url: '/users',
    actions: [async ({ getBody }) => {
        const parts = await getBody({ raw: true, multipart: true });

        // parts ~= [{
        //     headers: {
        //         'content-disposition': 'form-data; name="name"'
        //     },
        //     data: Buffer <...>
        // }, {
        //     headers: {
        //         'content-disposition': 'form-data; name="avatar" filename="my-cat.png"',
        //         'content-type': 'image/png;'
        //     },
        //     data: Buffer <...>
        // }]

        return \`User creation \${parts[0].data.toString()}!\`;
    }]
});
```

### skipNormalize

By default, the data received is pushed through some body normalization. This is so that the body we receive is in a format we expect and is therefore easier to work with. Normalization is directed by `arrays`, `required`, `numbers`, `booleans`, and `validate`.

Disable body normalization with either `raw` or `skipNormalize`.

### arrays

The provided list of fields are converted into arrays.

Fields that are not specified will return only the first value. This is because the framework only knows that a field is an array when it receives more than one value for a given name from the client. It would be inconvenient if parameters are sometimes arrays, and therefore we are explicit.

```javascript
createRoute({
    method: 'POST',
    url: '/users',
    actions: [async ({ getBody }) => {
        const body = await getBody({
            arrays: ['ownedPets']
        });

        // body ~= {
        //     ownedPets: ['cat'],
        //     age: '23',
        //     name: 'April'
        // }
    }]
});
```

### required

The provided list of fields are not `null` or `undefined`. It's a quick way to throw a `422 Unprocessable Entity` error. These fields might still be empty, but at least something was sent and we know we can operate on them. When a `required` field is also an `arrays` field the array is sure to have at least one value.

### numbers

The provided list of fields will throw a `422 Unprocessable Entity` error if any value is provided which parses into `NaN`. Otherwise they are converted into numbers.

When a `numbers` field is also an `arrays` field the array is all numbers.

### booleans

The provided list of fields are converted into `false` if the value is falsy, `'0'`, or `'false'` (case insensitive), otherwise `true`. When a `booleans` field is also an `arrays` field the array is all booleans. When a `booleans` field is also a `numbers` field the value is first converted to a number and then to a boolean this is not recommended.

### validate

After normalization, this method further ensures the validity of the data. Returning anything throws a `422 Unprocessable Entity` error.

```javascript
interface TBody {
    ownedPets: string[];
    age: number;
    name: string;
}

createRoute({
    method: 'POST',
    url: '/users',
    actions: [async ({ getBody }) => {
        const body = await getBody<TBody>({
            arrays: ['ownedPets'],
            required: ['age', 'name'],
            numbers: ['age'],
            validate (result) {
                if (result.ownedPets.length > 99) {
                    return 'Too many pets';
                }
                if (result.name.length < 3) {
                    return 'Name is too short';
                }
            }
        });

        // body ~= {
        //     ownedPets: ['Maggie', 'Ralph'],
        //     age: 23,
        //     name: 'April'
        // }
    }]
});
```

We know it is safe to use `result.ownedPets.length` in this example because it is listed as an `arrays` field and therefore certain to be an array. `result.name` is also safe to use because it is listed as a `required` field and therefore certain to exist.
