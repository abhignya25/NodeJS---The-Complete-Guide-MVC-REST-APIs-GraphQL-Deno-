const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        required: false,
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'], // Enum type for priority levels
        default: 'medium', // Default priority
    },
});

// Create and export the model
const Item = mongoose.model('Task', TaskSchema);

module.exports = Item;