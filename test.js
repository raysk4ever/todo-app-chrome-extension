
const getTodosLocal = () => JSON.parse(localStorage.getItem('todos') ?? '[]')

const todos = getTodosLocal()
const todosElement = document.getElementById('todos')
const messageElement = document.getElementById('message')

const addTodoBtn = document.getElementById('add-todo')
const inputEle = document.getElementById('new-todo')

addTodoBtn.addEventListener('click', (event) => {
  event.preventDefault()
  if (inputEle.value.trim() === '') {
    messageElement.innerText = 'Invalid Todo'
    messageElement.classList.add('error')
    return
  }
  messageElement.classList.remove('error')
  messageElement.innerText = ''
  const newTodo = {
    id: Math.random() * 1000,
    todo: inputEle.value,
    completed: false
  }
  inputEle.value = ''
  todos.push(newTodo)
  updateLocal(todos)
  appendNewTodoInList(createTodoElement(newTodo, todos.length - 1))
})

todosElement.addEventListener('click', (e) => {
  const {name, localName, type, idx} = e.target
  // e.stopPropagation()
  // e.preventDefault()
  if (localName === 'input' && type === 'checkbox') {
    todos[idx].completed = !todos[idx].completed
    updateLocal(todos)
  } else if (localName === 'button' && name === 'close') {
    console.log(localName, name, type)
    todos.splice(idx, 1)
    updateLocal(todos)
    const deletedTodoElement = document.getElementById(idx)
    todosElement.removeChild(deletedTodoElement)
  }
})

const updateLocal = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos))
}


const appendNewTodoInList = todo => {
  todosElement.appendChild(todo)
}

function renderTodo(todos) {
  todosElement.innerHTML = ''
  todos.forEach((todo, idx) => {
    appendNewTodoInList(createTodoElement(todo, idx))
  });
} 

function createTodoElement(todo, idx) {
  const div = document.createElement('div')
  div.classList.add('todo')
  div.id = idx
  const label = document.createElement('label')
  label.setAttribute('for', todo.id) 
  const checkbox = document.createElement('input')
  const closeBtn = document.createElement('button')
  closeBtn.innerText = 'x'
  closeBtn.classList.add('close-btn')
  closeBtn.name = 'close'
  closeBtn.idx = idx
  checkbox.type = 'checkbox'
  checkbox.id = todo.id
  checkbox.idx = idx
  checkbox.defaultChecked = todo.completed
  label.innerText = todo.todo
  div.appendChild(checkbox)
  div.appendChild(label)
  div.appendChild(closeBtn)
  return div
}

async function startApp() {
  renderTodo(todos)
}

startApp()