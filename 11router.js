const express = require('express');
require('dotenv').config();
const app = express();

const people = require('./controllers/people-controller');
// const tasks = require('./controllers/task-controller');

const connectDB = require('./db/connect');

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use('/api/people', people);
// app.use('/api/tasks', tasks);

const initServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, () => {
      console.log('5000');
    });
  } catch (err) {
    console.log(err);
  }
};

initServer();
