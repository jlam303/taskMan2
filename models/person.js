const mongoose = require('mongoose');

const personSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Must provide a name'],
      trim: true,
      maxLength: [20, 'The name can not exceed 20 chars'],
    },
    age: {
      type: Number,
      required: true,
    },
    assigned: {
      type: String,
      default: 'None',
    },
  },
  { collection: 'people' }
);

module.exports = mongoose.model('Person', personSchema);
