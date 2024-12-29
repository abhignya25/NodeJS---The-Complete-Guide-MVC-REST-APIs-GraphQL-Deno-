# Using MongoClient.connect with Express

This guide explains how to use `MongoClient.connect` from the MongoDB driver in an Express application.

---

## Steps

1. **Install MongoDB Driver**: Install the `mongodb` package:
   ```bash
   npm install mongodb
   ```

2. **Import and Configure MongoClient**: Use the `MongoClient` class to connect to the MongoDB database.

3. **Connect to the Database**: Use the `connect` method to establish a connection.

4. **Perform Database Operations**: Execute CRUD operations using the database connection.

5. **Integrate with Express**: Use the database connection in your Express route handlers.

---

## Example: Using `MongoClient.connect` in an Express App

```javascript
const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

// MongoDB connection URL and database name
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'testDB';

let db; // Variable to store the database connection

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the process if connection fails
  });

// Middleware to parse JSON
app.use(express.json());

// Example route: Fetch all documents from a collection
app.get('/items', async (req, res) => {
  try {
    const items = await db.collection('items').find().toArray();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Example route: Add a new item to a collection
app.post('/items', async (req, res) => {
  try {
    const newItem = req.body; // Assuming the request body contains the new item
    const result = await db.collection('items').insertOne(newItem);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

---

## Explanation

1. **Connection**: 
   - `MongoClient.connect` establishes a connection to MongoDB. 
   - The `{ useUnifiedTopology: true }` option ensures the use of the new MongoDB driver's unified topology.

2. **Database Access**: 
   - `client.db(dbName)` gives you access to the database.

3. **CRUD Operations**:
   - `db.collection('collectionName').find().toArray()` fetches documents from a collection.
   - `db.collection('collectionName').insertOne(data)` inserts a document into a collection.

4. **Error Handling**:
   - Use `try-catch` blocks to handle errors gracefully.

5. **Integration**:
   - The `db` variable is shared across route handlers, making it accessible for all database operations.

---

## Endpoints

1. **GET /items**: Fetch all documents in the `items` collection.
2. **POST /items**: Add a new document to the `items` collection.
