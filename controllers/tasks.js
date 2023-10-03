const tasks = require('../models/tasks');
const Task = require('../models/tasks');
const readPeople = async (req, res) => {
  // res.json({ success: true, data: people });
  try {
    let answer = await Task.find({});
    res.json(answer);
  } catch (err) {}
};
let id = 0;
const createPeople = async (req, res) => {
  let answer = await Task.find({});
  if (!answer[0]) {
    id = 1;
  } else {
    id = answer[answer.length - 1].taskId + 1;
  }
  const { name, description } = req.body;
  if (!name) {
    return res.status(404).json({ success: false, data: [] });
  }
  let newTask = await Task.create({
    taskId: id,
    name: name,
    description: description,
  });
  res.status(202).json(newTask);
};

const updatePeople = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    let answer = await Task.find({});
    const answer2 = answer.find((Task) => {
      return Task.taskId === Number(id);
    });
    if (!answer2) {
      return express.json({ success: false, data: [] });
    }
    const newPeople = await Task.findByIdAndUpdate(
      { _id: answer2._id },
      { name: name, description: description }
    );
    res.status(202).json({ data: newPeople, success: true });
  } catch (err) {
    console.log(err);
  }
};

const deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    if (id == -2) {
      await Task.deleteMany({});
    }
    let answer = await Task.find({});
    const answer2 = answer.find((Task) => {
      return Task.taskId === Number(id);
    });
    if (!answer2) {
      return res.json({ success: false, data: [] });
    }
    const newPeople = await Task.findByIdAndDelete({ _id: answer2._id });
    res.status(202).json({ data: newPeople, success: true });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { readPeople, createPeople, updatePeople, deletePerson };
