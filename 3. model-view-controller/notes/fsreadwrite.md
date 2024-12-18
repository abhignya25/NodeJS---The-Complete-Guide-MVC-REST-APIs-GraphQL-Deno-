# Using `fs.readFile` and `fs.writeFile` in Node.js

In Node.js, the `fs` module is used to interact with the file system. The methods `fs.readFile` and `fs.writeFile` are used to read and write files, respectively. Both methods are asynchronous and follow the standard Node.js callback pattern, where the last argument is a callback function that handles the result or error.

---

## 1. `fs.readFile`

This method reads the contents of a file asynchronously.

### **Syntax:**
```javascript
fs.readFile(path, options, callback)
```

- **`path`**: The path to the file.
- **`options`**: (Optional) Can specify the encoding (e.g., `'utf8'`) or return raw buffer data.
- **`callback`**: A function with the signature `(err, data)`.
  - **`err`**: Contains the error if something went wrong.
  - **`data`**: The file content if the operation was successful.

---

## 2. `fs.writeFile`

This method writes data to a file asynchronously. If the file does not exist, it is created; otherwise, it is overwritten.

### **Syntax:**
```javascript
fs.writeFile(file, data, options, callback)
```

- **`file`**: The path to the file.
- **`data`**: The content to write to the file.
- **`options`**: (Optional) Can specify the encoding (e.g., `'utf8'`), file mode, or flags.
- **`callback`**: A function with the signature `(err)`.
  - **`err`**: Contains the error if something went wrong.

---

## Error Handling

Always check the `err` argument in the callback to handle errors gracefully.

---

## Example

The following example demonstrates reading a file and writing its content to another file with error handling:

```javascript
const fs = require('fs');

// Read from a file
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  console.log('File content:', data);

  // Write the content to another file
  fs.writeFile('output.txt', data, 'utf8', (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
      return;
    }

    console.log('File content successfully written to output.txt');
  });
});
```

---

## How It Works

### **Read Operation**:
- `fs.readFile('input.txt', 'utf8', callback)` reads the content of `input.txt`.
- If successful, the content is passed to the callback as `data`.
- If an error occurs (e.g., file not found), it is captured in `err`.

### **Write Operation**:
- `fs.writeFile('output.txt', data, 'utf8', callback)` writes the read content to `output.txt`.
- If an error occurs during writing, it is captured in `err`.

---

## Output (assuming `input.txt` contains `"Hello, World!"`):
```
File content: Hello, World!
File content successfully written to output.txt
```

---

## Key Notes

- Always check for errors to prevent crashes.
- Use `fs.promises` or `util.promisify` for a more modern promise-based approach.
