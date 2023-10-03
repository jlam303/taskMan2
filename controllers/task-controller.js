const express = require('express');
const router = express.Router();

const {
  readPeople,
  createPeople,
  updatePeople,
  deletePerson,
} = require('./tasks.js');

router.get('/', readPeople);
router.post('/', createPeople);
router.put('/:id', updatePeople);
router.delete('/:id', deletePerson);

module.exports = router;
