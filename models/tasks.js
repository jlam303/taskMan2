const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    taskId: {
      type: Number,
    },
    name: {
      type: String,
      required: [true, 'Must provide a name'],
      trim: true,
      maxLength: [20, 'The name can not exceed 20 chars'],
    },
    description: {
      type: String,
      required: true,
    },
  },
  { collection: 'tasks' }
);

module.exports = mongoose.model('Tasks', taskSchema);
