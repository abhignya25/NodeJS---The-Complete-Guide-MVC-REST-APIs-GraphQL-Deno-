const express = require('express');
const app = express();
const port = 4000;

function basicAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
      return res.status(401).json({ message: 'No authorization header provided' });
    }
  
    const [scheme, credentials] = authHeader.split(' ');
  
    if (scheme !== 'Basic' || !credentials) {
      return res.status(401).json({ message: 'Invalid authorization format' });
    }
  
    const decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    const [username, password] = decoded.split(':');
  
    // Set your own username and password
    const validUsername = 'user';
    const validPassword = 'password';
  
    if (username === validUsername && password === validPassword) {
      next(); // Authentication passed, proceed to the route
    } else {
      return res.status(403).json({ message: 'Forbidden: Invalid credentials' });
    }
}

app.get('/api/secure-data', basicAuth, (req, res) => {
    res.json({ message: 'This is a protected route, accessible only with valid credentials!' });
});

app.listen(port, () => [
    console.log(`Server is running on port ${port}`)
]);