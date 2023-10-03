const result = document.querySelector('.result');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('.form-input2');

const btn = document.querySelector('.submit-btn');
let name2;
const formAlert = document.querySelector('.form-alert');
const fetchPeople = async () => {
  try {
    const data = await axios.get('/api/tasks');
    console.log(data);
    const people = data.data.map((person) => {
      return `<div class="divy"><h5 class = "names"> ${person.name} </h5> <h3>Description: ${person.description}</h3><button class="edit" data-id="${person.taskId}">Edit</button><button class="delete1" data-id="${person.taskId}">Delete</button><p style="display:flex; text-align:center"></p></div>`;
    });
    result.innerHTML = people.join('');
    const edit = document.querySelectorAll('.edit');
    edit.forEach((element) => {
      element.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const data = await axios.get('/api/tasks');
          name2 = data.data.filter(
            (x) => x.taskId == Number(element.getAttribute('data-id'))
          );
          console.log(name2);
          sessionStorage.setItem('name', name2[0].name);
          sessionStorage.setItem('ageDesc', name2[0].description);
          sessionStorage.setItem('id', name2[0].taskId);
          sessionStorage.setItem('type', 'task');

          window.location.href = '/edit.html';
          fetchPeople();
        } catch (error) {}
      });
    });

    const delete1 = document.querySelectorAll('.delete1');
    delete1.forEach((element) => {
      element.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
          await axios.delete('/api/task/' + element.getAttribute('data-id'));
          fetchPeople();
        } catch (error) {
          formAlert.textContent = error.response.data.msg;
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};
fetchPeople();

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const nameValue = input.value;
  const age = input2.value;
  try {
    const person = await axios.post('/api/people', {
      name: nameValue,
      age: age,
    });
    const h5 = document.createElement('h5');
    h5.textContent = person.person;
    result.appendChild(h5);
    const h6 = document.createElement('h3');
    h6.textContent = person.age;
    result.appendChild(h6);

    fetchPeople();
  } catch (error) {
    formAlert.textContent = error;
  }
  input.value = '';
  input2.value = '';
});
