# Editing a Document Using Mongoose Schema Methods

This guide demonstrates how to edit a document in Mongoose by defining a custom schema method. This approach encapsulates the logic for updating a document within the schema, making it reusable and easier to maintain.

---

## Example: Editing a Document Using Schema Methods

```javascript
const mongoose = require('mongoose');

// Define the schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true }
});

// Add a custom method to update the quantity
itemSchema.methods.updateQuantity = async function (newQuantity) {
  this.quantity = newQuantity; // Update the field
  return await this.save(); // Save the updated document
};

// Create the model
const Item = mongoose.model('Item', itemSchema);

// Example usage
async function editItem() {
  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/testDB', { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Find an existing item
    const item = await Item.findOne({ name: 'Widget' });
    if (!item) {
      console.log('Item not found');
      return;
    }

    // Call the custom method to update the quantity
    const updatedItem = await item.updateQuantity(20);
    console.log('Updated Item:', updatedItem);
  } catch (error) {
    console.error('Error editing item:', error.message);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
}

editItem();
```

---

## Explanation

1. **Define the Method**:
   - `updateQuantity` is a custom instance method added to the schema using `schema.methods`.
   - It modifies the `quantity` field and then calls `this.save()` to persist the changes.

2. **Find the Document**:
   - Use a query like `Item.findOne()` to locate the document you want to update.

3. **Call the Custom Method**:
   - Once the document is found, call the `updateQuantity` method on the document instance with the new value.

4. **Save the Changes**:
   - The custom method uses `this.save()` to save the changes to the database.

5. **Handle Results**:
   - The updated document is returned, allowing you to use it as needed.

---

## Benefits of Using Schema Methods

- **Encapsulation**:
  Encapsulates the logic for editing a document within the schema, ensuring consistent behavior across your application.

- **Reusability**:
  Custom methods can be reused wherever needed without rewriting the logic.

- **Maintainability**:
  Centralized logic makes it easier to update and maintain the code.
