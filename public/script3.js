const result = document.querySelector('.result');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('.form-input2');
input.value = sessionStorage.getItem('name');
input2.value = sessionStorage.getItem('ageDesc');
const btn = document.querySelector('.submit-btn');
const formAlert = document.querySelector('.form-alert');

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const nameValue = input.value;
  const age = input2.value;
  try {
    if (sessionStorage.getItem('type') == 'user') {
      await axios.put('/api/people/' + sessionStorage.getItem('id'), {
        name: nameValue,
        age: age,
      });
      window.location.href = '/javascript.html';
    } else if (sessionStorage.getItem('type') == 'task') {
      await axios.put('/api/tasks/' + sessionStorage.getItem('id'), {
        name: nameValue,
        description: age,
      });
      window.location.href = '/index.html';
    }
  } catch (error) {
    console.log(error);
  }
});
