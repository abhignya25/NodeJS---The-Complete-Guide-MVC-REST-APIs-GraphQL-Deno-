# Using EJS in Node.js

EJS (Embedded JavaScript) is a templating engine for Node.js that allows you to generate HTML using JavaScript. It is simple, fast, and supports embedding JavaScript logic directly into HTML templates. EJS is commonly used with the Express framework.

---

## Features of EJS

- **Simple syntax**: Embeds JavaScript code inside `<% %>` tags.
- **Supports partials**: Reuse sections of templates.
- **Template inheritance**: Use layouts for consistent structure.
- **Custom filters and functions**.

---

## How to Use EJS in Node.js

### Step 1: Install EJS

Install EJS as a dependency in your Node.js project:

```bash
npm install ejs
```

If you’re using Express, it’s included as a supported view engine by default.

---

### Step 2: Set Up Express with EJS

In your `app.js` or `index.js` file, configure EJS as the view engine:

```javascript
const express = require('express');

const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Define the views directory
app.set('views', './views');

// Define a route
app.get('/', (req, res) => {
  res.render('index', { title: 'Welcome', message: 'Hello, EJS!' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

### Step 3: Create EJS Templates

Create a `views` directory and add an `index.ejs` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= title %></title>
</head>
<body>
  <h1><%= message %></h1>
</body>
</html>
```

- `<%= variable %>`: Outputs the value of a variable and escapes special characters.
- `<%- variable %>`: Outputs raw HTML (does not escape special characters).

---

### Step 4: Run the Application

Run your application:

```bash
node app.js
```

Visit [http://localhost:3000](http://localhost:3000) to see your EJS template rendered.

---

## Additional EJS Features

### 1. Using Partials

Partials allow you to reuse sections of templates, such as headers or footers.

1. Create a `partials` folder in the `views` directory.
2. Add a `header.ejs` file:

   ```html
   <header>
     <h1>My Website</h1>
   </header>
   ```

3. Include it in another template using `<%- include() %>`:

   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <title><%= title %></title>
   </head>
   <body>
     <%- include('partials/header') %>
     <h2><%= message %></h2>
   </body>
   </html>
   ```

---

### 2. Loops and Conditionals

You can use JavaScript logic inside templates:

```html
<ul>
  <% for (let item of items) { %>
    <li><%= item %></li>
  <% } %>
</ul>

<% if (loggedIn) { %>
  <p>Welcome back, <%= username %>!</p>
<% } else { %>
  <p>Please log in.</p>
<% } %>
```

---

### 3. Template Inheritance

EJS does not have built-in support for layouts like Handlebars, but you can achieve a similar effect using partials for common sections like headers, footers, and navigation bars.

---

## Advantages of EJS

- Familiar syntax for those who know JavaScript.
- Lightweight and fast.
- Good for small to medium-sized projects.
- Supports custom logic directly in templates.

---

## Drawbacks of EJS

- Mixing logic with presentation can lead to harder-to-maintain code.
- Limited functionality compared to more feature-rich templating engines like Handlebars or Pug.

---

EJS is a great choice for projects where you need a simple and quick solution to render dynamic HTML pages using JavaScript.
