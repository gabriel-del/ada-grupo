const localStorageKey = 'todo-list',
  addTaskBtn = document.getElementById('btn-add-task'),
  updateTaskBtn = document.getElementById('btn-update-task'),
  values = JSON.parse(localStorage.getItem(localStorageKey) || '[]'),
  input = document.getElementById('input-new-task')
let idToUpdate = '', lastTask = '', lastId = ''

input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    addTaskBtn.style.display !== 'none' ? addTaskBtn.click() : updateTaskBtn.click()
  }
})

function addNewTask() {
  const newTask = {Task: input.value, Status: 'Pendente'}
  input.style.border = ''
  if (!input.value) {
    input.style.border = '1px solid red'
    return alert('Digite um item para incluir na lista.')
  }
  if (values.length === 0) {
    values.push({Id: values.length + 1, ...newTask})
    saveList()
    input.value = ''
    return showTodoList()
  }
  lastTask = values.findLast(({Id}) => Id >= values.length)
  lastId = lastTask.Id
  values.push({Id: lastId + 1, ...newTask})
  saveList()
  input.value = ''
  showTodoList()
}

function saveList() { localStorage.setItem(localStorageKey, JSON.stringify(values)) }

function showTodoList() {
  const list = document.getElementById('todo-list')
  list.innerHTML = ''
  for (const value of values){
    list.innerHTML += `
        <li>
          <span class='${value.Status === 'Finalizado' ? 'task-done' : ''}'>${value.Task}</span>
            <div id='btn-task'>
              <button id='btn-edit' onclick='editTask("${value.Id}")'><i width="16" height="16" class="bi bi-pencil"></i></button>
              <button id='btn-remove' onclick='removeItem("${value.Id}")'><i width="16" height="16" class="bi bi-trash3"></i></button>
              <button id='btn-done' onclick='doneTask("${value.Id}")'><i width="16" height="16" class="bi bi-pencil"></i></button>
            </div>
        </li>
      <hr>`}
}

function editTask(data) {
  const index = values.findIndex(i => i.Id === data)
  idToUpdate = values[index].Id
  input.value = values[index].Task
  addTaskBtn.style.display = 'none'
  updateTaskBtn.style.display = 'block'
}

function removeItem(data) {
  const index = values.findIndex(i => i.Id === data)
  values.splice(index, 1)
  saveList()
  showTodoList()
}

function doneTask(data) {
  const index = values.findIndex(i => i.Id === data)
  values[index].Status === 'Finalizado' ? (values[index].Status = 'Pendente') : (values[index].Status = 'Finalizado')
  saveList()
  showTodoList()
}

function updateTask() {
  const index = values.findIndex(i => i.Id === idToUpdate)
  values[index].Task = input.value
  saveList()
  input.value = ''
  showTodoList()
}

showTodoList()
