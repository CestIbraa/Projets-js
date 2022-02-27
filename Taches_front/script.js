
const BASE_URL = 'http://127.0.0.1:8000/api';

const getTodoItems = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/taches`);

    const todoItems = response.data;

    console.log(`la liste des taches`, todoItems);

    return todoItems;
  } catch (errors) {
    console.error(errors);
  }
};



const createTodoElement = item => {
  const todoElement = document.createElement('li');
  todoElement.id = item.id;

  todoElement.appendChild(document.createTextNode(item.nom));
  todoElement.onclick = async event => await removeTodoElement(event, todoElement);


  return todoElement;
};


const updateTodoList = todoItems => {
  const todoList = document.querySelector('ul');

  if (Array.isArray(todoItems) && todoItems.length > 0) {
    todoItems.map(todoItem => {
      todoList.appendChild(createTodoElement(todoItem));
    });
  } else if (todoItems) {
    todoList.appendChild(createTodoElement(todoItems));
  }
};

const main = async () => {
  updateTodoList(await getTodoItems());
};

main();

const form = document.querySelector('form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const title = document.querySelector('#title').value;

  const todo = {
    nom: title,
  };

  const submitTodoItem = await addTodoItem(todo);
  updateTodoList(submitTodoItem);
});

const addTodoItem = async todo => {
  try {
    const response = await axios.post(`${BASE_URL}/taches`, todo);
    const newTodoItem = response.data;
    console.log(`Added a new Todo!`, newTodoItem);
    return newTodoItem;
  } catch (errors) {
    console.error(errors);
  }
};


// ...

const deleteTodoItem = async id => {
  try {
    const response = await axios.delete(`${BASE_URL}/taches/${id}`);
    console.log(`Tache supprimée ID: `, id);
    return response.data;
  } catch (errors) {
    console.error(errors);
  }
};

const removeTodoElement = async (event, element) => {
  event.target.parentElement.removeChild(element);
  const id = element.id;

  await deleteTodoItem(id);
};



