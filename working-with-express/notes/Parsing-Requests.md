# How `express.urlencoded` Works

## Overview
`express.urlencoded` is a middleware function. Middleware in Express inherently takes three arguments: `(req, res, next)`. After processing the request (in this case, parsing `x-www-form-urlencoded` data from the request body), it automatically calls `next()` to pass control to the next middleware or route handler in the stack.

---

## Example

```javascript
const express = require('express');
const app = express();

// Use the urlencoded middleware
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
    // Access parsed form data
    console.log(req.body); 
    res.send('Form submitted successfully!');
});
```

---

## What Happens Internally

### 1. Middleware Processes the Request
- It parses the incoming `application/x-www-form-urlencoded` request body.
- The parsed data is added to `req.body`.

### 2. `next()` is Called
- After parsing, the middleware automatically calls `next()`, allowing subsequent middleware or the route handler to execute.

---

## Why `next()` Is Built-In

Middleware in Express is designed to be modular and chainable. Including `next()` in middleware like `express.urlencoded` ensures that:

- The request-processing flow continues after the middleware does its job.
- Multiple middleware functions can cooperate to handle the same request.

If `next()` were not built into `express.urlencoded`, the request would get "stuck" after the body-parsing stage, as no further middleware or route handler would execute.
