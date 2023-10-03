const result = document.querySelector('.result1');
const result2 = document.querySelector('.result2');

const input = document.querySelector('.form-input');
const input2 = document.querySelector('.form-input2');

const btn = document.querySelector('.submit-btn');
let name2;
const formAlert = document.querySelector('.form-alert');
const fetchPeople = async () => {
  try {
    const data = await axios.get('/api/people');
    console.log(data);
    const people = data.data.map((person) => {
      return `<div class="divy"><h5 class = "names"> ${person.name} </h5> <h3>Age: ${person.age}</h3><button class="edit" data-id="${person.userId}">Edit</button><button class="delete1" data-id="${person.userId}">Delete</button><p style="display:flex; text-align:center"></div>`;
    });
    result.innerHTML = people.join('');
    const data2 = await axios.get('/api/tasks');
    console.log(data2);
    const people2 = data2.data.map((person) => {
      return `<div class="divy"><h5 class = "names"> ${person.name} </h5> <h3>Description: ${person.description}</h3><p style="display:flex; text-align:center">Done:<input type="checkbox" class="check" id="${person.taskId}" name="${person.taskId}" ></p></div>`;
    });
    result2.innerHTML = people2.join('');
    const edit = document.querySelectorAll('.edit');
    edit.forEach((element) => {
      element.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const data = await axios.get('/api/people');
          name2 = data.data.filter(
            (x) => x.userId == Number(element.getAttribute('data-id'))
          );
          sessionStorage.setItem('name', name2[0].name);
          sessionStorage.setItem('ageDesc', name2[0].age);
          sessionStorage.setItem('id', name2[0].userId);
          sessionStorage.setItem('type', 'user');

          window.location.href = '/edit.html';
          fetchPeople();
        } catch (error) {}
      });
    });
    const done = document.querySelectorAll('.check');
    console.log(document.querySelectorAll('.divy'));
    console.log(done);
    done.forEach((element) => {
      element.addEventListener('click', async (e) => {
        try {
          if (element.checked == true) {
            for (
              let i = 0;
              i < document.querySelectorAll('.divy').length;
              i++
            ) {
              console.log(i);
              if (
                document
                  .querySelectorAll('.divy')
                  [i].children[2].children[0].getAttribute('id') ==
                Number(element.getAttribute('id'))
              ) {
                document.querySelectorAll('.divy')[i].classList.add('crossed');
              }
            }
          } else {
            for (
              let i = 0;
              i < document.querySelectorAll('.divy').length;
              i++
            ) {
              if (
                document
                  .querySelectorAll('.divy')
                  [i].children[2].children[0].getAttribute('id') ==
                element.getAttribute('id')
              ) {
                document
                  .querySelectorAll('.divy')
                  [i].classList.remove('crossed');
              }
            }
          }
        } catch (error) {}
      });
    });
    const delete1 = document.querySelectorAll('.delete1');
    delete1.forEach((element) => {
      element.addEventListener('click', async (e) => {
        e.preventDefault();

        try {
          await axios.delete('/api/people/' + element.getAttribute('data-id'));
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
