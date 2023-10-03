const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:5000';
const people = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 22 },
  { name: 'David', age: 28 },
  { name: 'Eve', age: 35 },
];
const tasks = [
  { name: 'Task 1', description: 'Complete assignment for class.' },
  { name: 'Task 2', description: 'Buy groceries for the week.' },
  { name: 'Task 3', description: 'Schedule a meeting with the team.' },
  { name: 'Task 4', description: 'Write a report for the project.' },
  { name: 'Task 5', description: 'Clean the house.' },
  { name: 'Task 6', description: 'Prepare a presentation for the client.' },
  { name: 'Task 7', description: 'Exercise for 30 minutes.' },
  { name: 'Task 8', description: 'Read a chapter from a book.' },
  { name: 'Task 9', description: 'Call a friend for a catch-up.' },
  { name: 'Task 10', description: 'Pay bills and organize finances.' },
  { name: 'Task 11', description: 'Learn a new programming language.' },
  { name: 'Task 12', description: 'Watch a tutorial on JavaScript.' },
  { name: 'Task 13', description: 'Visit the museum this weekend.' },
  { name: 'Task 14', description: 'Plan a trip for the holidays.' },
  { name: 'Task 15', description: 'Cook a new recipe for dinner.' },
  { name: 'Task 16', description: 'Review and update resume.' },
  { name: 'Task 17', description: 'Organize the garage.' },
  { name: 'Task 18', description: 'Attend a yoga class.' },
  { name: 'Task 19', description: 'Volunteer at a local charity.' },
  { name: 'Task 20', description: 'Create a weekly workout plan.' },
];

pushData = async () => {
  for (let i in people) {
    await axios.post('/api/people', {
      name: people[i].name,
      age: people[i].age,
    });
  }
  for (let i in tasks) {
    await axios.post('/api/tasks', {
      name: tasks[i].name,
      description: tasks[i].description,
    });
  }
};

pushData();
