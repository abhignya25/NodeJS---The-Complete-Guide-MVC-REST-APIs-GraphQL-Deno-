# How to Configure Pug in a Node.js App (with Express.js)

To use Pug in a Node.js application, you typically configure it in an Express app. Here’s how you can set it up step by step:

## Step 1: Install Dependencies

First, you need to install the `pug` package via npm.

```bash
npm install pug
```

## Step 2: Set Pug as the View Engine in Express

In your Express app, you can set Pug as the view engine using the `app.set` method. This method is used to set various application settings, and in this case, you'll use it to specify the view engine and the location of your templates.

Here is an example of how to do this:

```javascript
const express = require('express');
const path = require('path');

const app = express();

// Set Pug as the view engine
app.set('view engine', 'pug');

// Set the directory where your Pug templates are stored
app.set('views', path.join(__dirname, 'views'));

// Define a simple route
app.get('/', (req, res) => {
  res.render('index', { name: 'John' }); // We do not have to pass the full route of index.pug because we already set the default templating engine and the default folder
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

### Explanation of the Code:

- **`app.set('view engine', 'pug')`**:  
  This sets Pug as the templating engine for rendering views in the Express app.

- **`app.set('views', path.join(__dirname, 'views'))`**:  
  This specifies the directory where Express will look for Pug template files. In this case, it's the `views` folder in the root of your project.

- **`res.render('index', { name: 'John' })`**:  
  This renders the Pug template `index.pug`, passing `{ name: 'John' }` as the data to be used in the template.


## Step 3: Create the Pug Template

Create a file called `index.pug` in the `views` folder:

```pug
doctype html
html
  head
    title Welcome
  body
    h1 Hello, #{name}!
    p This is a simple Pug template rendering in an Express app.
```

## Step 4: Run Your Application

Now, if you run your app with:

```bash
node app.js
```

You can open your browser and navigate to http://localhost:3000. You should see the rendered HTML output with the variable name replaced by "John" from the template.
