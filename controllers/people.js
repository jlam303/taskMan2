const Person = require('../models/person');
const readPeople = async (req, res) => {
  // res.json({ success: true, data: people });
  try {
    let answer = await Person.find({});
    return answer;
  } catch (err) {}
};
let id = 0;
const createPeople = async (req, res) => {
  let answer = await Person.find({});
  if (!answer[0]) {
    id = 1;
  } else {
    id = answer[answer.length - 1].userId + 1;
  }
  const { name, age } = req.body;
  if (!name) {
    return res.status(404).json({ success: false, data: [] });
  }
  let newPerson = await Person.create({ userId: id, name: name, age: age });
  res.status(202).json(newPerson);
};

const updatePeople = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const person = people.find((person) => {
    return person.id === Number(id);
  });
  if (!person) {
    return express.json({ success: false, data: [] });
  }
  const newPeople = people.map((person) => {
    if (person.id === Number(id)) {
      person.name = name;
    }
    return person;
  });
  res.status(202).json({ data: newPeople, success: true });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => {
    return person.id === Number(id);
  });
  if (!person) {
    return res.status(404).json({ success: false, msg: 'e' });
  }
  people = people.filter((person) => {
    return person.id != Number(id);
  });
  res.status(202).json({ data: people, success: true });
};

module.exports = { readPeople, createPeople, updatePeople, deletePerson };
