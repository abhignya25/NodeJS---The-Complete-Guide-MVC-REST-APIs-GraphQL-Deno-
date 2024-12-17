# Model-View-Controller (MVC) in Node.js

Model-View-Controller (MVC) is a software design pattern used to separate concerns in an application. It divides an application into three interconnected components:

1. **Model**: Manages the data, logic, and rules of the application.
2. **View**: Displays the data (user interface) and sends user commands to the Controller.
3. **Controller**: Handles the user's requests, processes them (often interacting with the Model), and returns the appropriate response.

In the context of **Node.js**, MVC is commonly used in web applications, especially with frameworks like **Express**.

---

## Components of MVC

### 1. **Model**
   - Represents the data structure and handles all database interactions.
   - It defines the logic for retrieving, updating, and saving data.
   - In a Node.js application, you might use **Mongoose** for MongoDB or **Sequelize** for SQL databases to define models.
   - Example:
     ```javascript
     const mongoose = require('mongoose');

     const UserSchema = new mongoose.Schema({
       name: String,
       email: String,
       password: String,
     });

     module.exports = mongoose.model('User', UserSchema);
     ```

---

### 2. **View**
   - Responsible for presenting data to the user in a specific format.
   - Usually consists of HTML templates. Templating engines like **EJS**, **Handlebars**, or **Pug** are often used to generate dynamic views.
   - Example:
     ```html
     <!-- views/user.ejs -->
     <h1>User Profile</h1>
     <p>Name: <%= user.name %></p>
     <p>Email: <%= user.email %></p>
     ```

---

### 3. **Controller**
   - Acts as a bridge between the Model and the View.
   - Processes user input, invokes the appropriate Model logic, and decides which View to render.
   - Example:
     ```javascript
     const User = require('../models/User');

     exports.getUserProfile = async (req, res) => {
       try {
         const user = await User.findById(req.params.id);
         res.render('user', { user });
       } catch (error) {
         res.status(500).send('Server Error');
       }
     };
     ```

---

## How MVC Works in Node.js

1. **User Request**: A user sends a request to the server, such as visiting a webpage or submitting a form.
2. **Controller Logic**: The request is routed to the appropriate controller method, which processes the input.
3. **Model Interaction**: If necessary, the controller interacts with the Model to fetch, update, or delete data.
4. **Response**: The controller sends the processed data to the View, which generates the appropriate user interface and sends it back to the user.

---

## Example of MVC in a Node.js Application

### **Directory Structure**
```plaintext
project/
├── models/
│   └── User.js
├── views/
│   └── user.ejs
├── controllers/
│   └── userController.js
├── routes/
│   └── userRoutes.js
├── app.js
```

### **Model (User.js)**
```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
```

---

### **Controller (userController.js)**
```javascript
const User = require('../models/User');

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.render('user', { user });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
```

---

### **Routes (userRoutes.js)**
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/profile/:id', userController.getUserProfile);

module.exports = router;
```

---

### **View (user.ejs)**
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Profile</title>
</head>
<body>
  <h1>User Profile</h1>
  <p>Name: <%= user.name %></p>
  <p>Email: <%= user.email %></p>
</body>
</html>
```

---

### **Main App (app.js)**
```javascript
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect to the database
mongoose.connect('mongodb://localhost:27017/mvc_example', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');

// Use routes
app.use('/', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

---

## Benefits of MVC in Node.js

1. **Separation of Concerns**: Code is organized, making it easier to maintain and scale.
2. **Reusability**: Models and Views can be reused across different parts of the application.
3. **Scalability**: The clear structure facilitates team collaboration and the addition of new features.
4. **Flexibility**: You can use different front-end tools or libraries for the View.

---

## Drawbacks

- Might feel overkill for very small projects.
- Requires some setup and boilerplate initially.

---

## Conclusion

Using MVC in Node.js applications provides a clean and modular way to build scalable and maintainable web applications. It separates data handling (Model), request/response logic (Controller), and user interface (View) into distinct components, making development more organized and efficient.
