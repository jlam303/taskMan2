const result = document.querySelector('.result');
const input = document.querySelector('.form-input');
const input2 = document.querySelector('.form-input2');

const btn = document.querySelector('.submit-btn');
let x = false;
let editId = -1;
let name2;
const formAlert = document.querySelector('.form-alert');
const fetchPeople = async () => {
  try {
    const data = await axios.get('/api/people');
    console.log(data);
    const people = data.data.map((person) => {
      return `<div class="divy"><h5 class = "names"> ${person.name} </h5><h3>${person.description}</h3><button class="edit" data-id="${person.id}">Edit</button><button class="delete1" data-id="${person.id}">Delete</button><p style="display:flex; text-align:center">Done:<input type="checkbox" class="check" id="${person.id}" name="${person.id}" ></p></div>`;
    });
    result.innerHTML = people.join('');
    const edit = document.querySelectorAll('.edit');
    edit.forEach((element) => {
      element.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.get('/api/people');
          name2 = data.data.filter(
            (x) => x.id == Number(element.getAttribute('data-id'))
          );
          input.value = name2[0].name;
          input2.value = name2[0].description;

          editId = element.getAttribute('data-id');
          x = true;
          fetchPeople();
        } catch (error) {}
      });
    });
    const done = document.querySelectorAll('.check');
    done.forEach((element) => {
      element.addEventListener('click', async (e) => {
        try {
          if (element.checked == true) {
            for (
              let i = 0;
              i < document.querySelectorAll('.divy').length;
              i++
            ) {
              if (
                document
                  .querySelectorAll('.divy')
                  [i].children[4].children[0].getAttribute('id') ==
                element.getAttribute('id')
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
                  [i].children[4].children[0].getAttribute('id') ==
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
          const { data } = await axios.delete(
            '/api/people/' + element.getAttribute('data-id')
          );
          fetchPeople();
        } catch (error) {
          formAlert.textContent = error.response.data.msg;
        }
      });
    });
  } catch (error) {
    console.log(error);
    formAlert.textContent = error.response.data.msg;
  }
};
fetchPeople();

btn.addEventListener('click', async (e) => {
  e.preventDefault();
  const nameValue = input.value;
  const descValue = input2.value;
  try {
    if (x) {
      x = false;
      await axios.put('/api/people/' + editId, {
        name: nameValue,
        description: descValue,
      });
    } else {
      const { data } = await axios.post('/api/people', {
        name: nameValue,
        description: descValue,
      });
      const h5 = document.createElement('h5');
      h5.textContent = data.person;
      result.appendChild(h5);
      const h6 = document.createElement('h3');
      h6.textContent = data.description;
      result.appendChild(h6);
    }
    fetchPeople();
  } catch (error) {
    formAlert.textContent = error;
  }
  input.value = '';
  input2.value = '';
});
