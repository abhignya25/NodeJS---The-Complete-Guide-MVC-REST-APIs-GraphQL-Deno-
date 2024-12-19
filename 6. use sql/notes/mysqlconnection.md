# Setting Up a MySQL Connection Using `mysql2`

This guide explains how to create a simple MySQL connection using the `mysql2` library with both `createConnection` and `createPool`.

---

## **Using `createConnection`**
`createConnection` establishes a single connection to the MySQL database.

```javascript
const mysql = require('mysql2');

// Create a single connection
const connection = mysql.createConnection({
  host: 'localhost',    // Your database host
  user: 'root',         // Your database username
  password: 'password', // Your database password
  database: 'test_db'   // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as ID', connection.threadId);
});

// Perform a query
connection.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }
  console.log('Query results:', results);
});

// Close the connection when done
connection.end();
```

---

## **Using `createPool`**
`createPool` creates a pool of reusable connections, which is better for handling multiple queries concurrently.

```javascript
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',    // Your database host
  user: 'root',         // Your database username
  password: 'password', // Your database password
  database: 'test_db',  // Your database name
  waitForConnections: true,
  connectionLimit: 10,  // Maximum number of connections in the pool
  queueLimit: 0         // Unlimited number of queued requests
});

// Perform a query using the pool
pool.query('SELECT * FROM users', (err, results) => {
  if (err) {
    console.error('Error executing query:', err.stack);
    return;
  }
  console.log('Query results:', results);
});

// No need to manually close connections; the pool manages them.
```

---

## **Key Differences Between `createConnection` and `createPool`**

| Feature               | `createConnection`                          | `createPool`                          |
|-----------------------|----------------------------------------------|---------------------------------------|
| **Connection**        | Single connection to the database.          | Pool of reusable connections.         |
| **Scalability**       | Suitable for small or low-traffic apps.      | Suitable for high-traffic apps.       |
| **Connection Reuse**  | Must reconnect for each use.                 | Automatically reuses connections.     |
| **Performance**       | Not optimal for concurrent requests.         | Optimized for handling concurrency.   |

---

### **Recommendation**
- Use `createPool` for applications that handle multiple requests or queries concurrently.
- Use `createConnection` for simple or lightweight applications where concurrency is not a concern.
