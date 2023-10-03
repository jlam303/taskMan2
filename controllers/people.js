const Person = require('../models/person');
const readPeople = async (req, res) => {
  // res.json({ success: true, data: people });
  try {
    let answer = await Person.find({});
    res.json(answer);
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

const updatePeople = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age } = req.body;
    let answer = await Person.find({});
    const answer2 = answer.find((person) => {
      return person.userId === Number(id);
    });
    if (!answer2) {
      return express.json({ success: false, data: [] });
    }
    if (age == -5) {
      await Person.findByIdAndUpdate({ _id: answer2._id }, { assigned: name });
    } else {
      await Person.findByIdAndUpdate(
        { _id: answer2._id },
        { name: name, age: age }
      );
    }

    res.status(202).json({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == -2) {
      await Person.deleteMany({});
    }
    let answer = await Person.find({});
    const answer2 = answer.find((person) => {
      return person.userId === Number(id);
    });
    if (!answer2) {
      return res.json({ success: false, data: [] });
    }
    const newPeople = await Person.findByIdAndDelete({ _id: answer2._id });
    res.status(202).json({ data: newPeople, success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  readPeople,
  createPeople,
  updatePeople,
  deletePerson,
};
