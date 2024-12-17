# Handlebars Templating Engine in Node.js

Handlebars is a powerful and easy-to-use templating engine for JavaScript. It allows you to generate dynamic HTML content by embedding expressions (placeholders) in a template that can be replaced with actual values at runtime. Handlebars provides a clear separation of concerns by allowing developers to structure HTML templates separately from JavaScript code.

Handlebars is often used in both client-side JavaScript (in the browser) and server-side JavaScript (in Node.js) to render dynamic content.

## Key Features of Handlebars

- **Expressions**: Use `{{}}` to embed values inside templates.
- **Helpers**: Custom JavaScript functions for dynamic content and logic inside templates.
- **Conditionals**: Include conditional rendering with `{{#if}}`, `{{#unless}}`, etc.
- **Loops**: Use `{{#each}}` to iterate over arrays or objects.
- **Partials**: Reuse templates by defining smaller partial templates.
- **Whitespace Control**: Handlebars gives you control over the formatting and whitespace between tags.
- **No logic**: we cannot compute anything in handlebars like >, <, >=, +, - etc

## How Handlebars Works

At the core of Handlebars, you define a template with placeholders. When you pass data to Handlebars, the placeholders get replaced by actual data values.

# Using Handlebars in Node.js

This guide explains how to use Handlebars in a Node.js application, typically integrated with a web framework like Express.

---

## Step 1: Install Dependencies

Install the necessary packages:

```bash
npm install express express-handlebars
```

- **`express`**: The web framework for building your application.
- **`express-handlebars`**: The adapter that integrates Handlebars with Express.

---

## Step 2: Set Up Express and Handlebars

Create an `app.js` or `index.js` file and configure Handlebars as the view engine.

Here’s an example:

```javascript
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

// Set up Handlebars as the view engine
app.engine('handlebars', exphbs.engine()); // handlebars is not default to express so we have to install it seperately and set the engine, the function returns the initialized view engine which is returned to 'handlebars' here. --- Files hsould be saved with .handlebars and if app.engine('hbs', exphbs.engine()); files should be saved with .hbs
app.set('view engine', 'handlebars');

// Set the views directory
app.set('views', './views');

// Define a route
app.get('/', (req, res) => {
  res.render('home', { title: 'Welcome', message: 'Hello, Handlebars!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

## Step 3: Create Handlebars Templates

Create a `views` directory in your project root, and inside it, add a template file named `home.handlebars`:

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
</head>
<body>
  <h1>{{message}}</h1>
</body>
</html>
```

---

## Step 4: Run the Application

Run your application:

```bash
node app.js
```

Visit [http://localhost:3000](http://localhost:3000) in your browser. You should see the message rendered by Handlebars.

---

## Optional: Use Partials and Helpers

### Partials

Reusing pieces of HTML across templates is easy with partials.

1. Define partials in a `views/partials` directory.
2. Register them when setting up the view engine:

   ```javascript
   app.engine('handlebars', exphbs.engine({ partialsDir: './views/partials' }));
   ```

### Helpers

Helpers allow you to add custom logic to templates.

1. Define helpers:

   ```javascript
   app.engine('handlebars', exphbs.engine({
     helpers: {
       shout: (text) => text.toUpperCase(),
     },
   }));
   ```

2. Use them in your templates:

   ```handlebars
   <p>{{shout message}}</p>
   
```