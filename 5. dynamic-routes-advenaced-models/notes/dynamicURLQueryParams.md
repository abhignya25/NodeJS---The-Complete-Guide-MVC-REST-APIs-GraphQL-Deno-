# Dynamic URLs and Query Parameters in Node.js

Dynamic URLs and query parameters are fundamental concepts in building web applications with Node.js, particularly when using frameworks like Express.js. Below is an overview of each concept:

---

## **1. Dynamic URLs**

Dynamic URLs are routes that include variable parts, allowing them to handle different inputs without defining a separate route for each case. They are useful for accessing specific resources based on an identifier (e.g., `/user/:id`).

### Example:

```javascript
const express = require('express');
const app = express();

app.get('/user/:id', (req, res) => {
  const userId = req.params.id; // Extracts the dynamic part of the URL
  res.send(`User ID is ${userId}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

### Explanation:
- `:id` is a dynamic segment of the URL.
- `req.params` holds the value of the dynamic segments.
  - For the URL `/user/123`, `req.params.id` will be `"123"`.

---

## **2. Query Parameters**

Query parameters are key-value pairs appended to the URL after a `?`. They are commonly used to pass optional data to the server.

### Example:

```javascript
app.get('/search', (req, res) => {
  const query = req.query.q; // Extract the 'q' parameter from the query string
  res.send(`Search query is: ${query}`);
});
```

### Explanation:
- Query parameters are part of the URL after the `?`, formatted as `key=value`.
  - Example: `/search?q=example`
- `req.query` is an object containing all query parameters.
  - For the URL `/search?q=example`, `req.query.q` will be `"example"`.

---

## **Combining Dynamic URLs and Query Parameters**

You can use both dynamic URLs and query parameters together for more flexible routing.

### Example:

```javascript
app.get('/user/:id/orders', (req, res) => {
  const userId = req.params.id; // Dynamic segment
  const orderStatus = req.query.status; // Query parameter
  res.send(`User ID: ${userId}, Order Status: ${orderStatus}`);
});
```

- URL: `/user/123/orders?status=pending`
  - `req.params.id` → `"123"`
  - `req.query.status` → `"pending"`

---

## **Key Differences**

| Feature              | Dynamic URLs            | Query Parameters         |
|----------------------|-------------------------|--------------------------|
| **Location in URL**  | Path segment (e.g., `/user/:id`) | After `?` in the URL (e.g., `?key=value`) |
| **Purpose**          | Identifies specific resources | Passes additional data or filters |
| **Access in Node.js**| `req.params`            | `req.query`              |

---

## **Use Cases**

- **Dynamic URLs:** For identifying specific resources, e.g., `/product/:productId`, `/user/:userId`.
- **Query Parameters:** For filtering or sorting data, e.g., `/products?category=electronics&sort=price`.
