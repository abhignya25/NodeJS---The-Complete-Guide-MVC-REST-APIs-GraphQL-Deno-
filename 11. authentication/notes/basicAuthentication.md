# **Password Authentication with bcrypt**

Password authentication with bcrypt is a widely-used method to securely store and validate passwords in web applications. Here's an explanation with examples:

---

## **Why Use bcrypt?**
- **Hashing**: Passwords are stored as hashed values, not in plain text, reducing the risk of exposure if the database is compromised.
- **Salting**: bcrypt automatically adds a unique "salt" to each password, ensuring that even identical passwords generate different hashes.
- **Computational Cost**: bcrypt is computationally intensive, making brute-force attacks slower.

---

## **How bcrypt Works**
1. **Hashing**:
   - When a user registers, their password is hashed and stored in the database.
2. **Comparison**:
   - During login, the entered password is hashed again and compared with the stored hash.
3. **Salt**:
   - A random value (salt) is added to the password before hashing to prevent attacks using precomputed hash tables (rainbow tables).

---

## **Example: Using bcrypt in Node.js**

### Install bcrypt
```bash
npm install bcrypt
```

### Code Example

```javascript
const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

// In-memory user database
const users = [];

// Register a new user
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Generate a hashed password
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error registering user" });
  }
});

// Login user
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  try {
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: "Login successful!" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error logging in" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

---

## **Explanation of Key Methods**

1. **bcrypt.hash(password, saltRounds)**:
   - Generates a hashed version of the password.
   - `saltRounds` determines the computational cost (higher = more secure but slower).
   - Common value: `10`.

2. **bcrypt.compare(password, hash)**:
   - Compares a plain text password with a hashed password.
   - Returns `true` if they match, `false` otherwise.

---

## **Benefits of bcrypt**
- Salting ensures each hash is unique.
- Adjustable computational cost (salt rounds) provides future-proofing against increasing computational power.
- Resistant to brute-force and rainbow table attacks.

---

### **Testing the Example**

1. **Register**:
   - POST `/register` with `username` and `password` in the request body.
   - Stores the hashed password in the in-memory database.

2. **Login**:
   - POST `/login` with the same `username` and `password`.
   - Validates the password by comparing it to the stored hash.
