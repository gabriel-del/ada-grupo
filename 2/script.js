const listKey = 'todo-list',
  inputTitle = document.querySelector('#title'),
  inputDesc = document.querySelector('#desc'),
  titleCharCount = document.getElementById("title-char-count"),
  descCharCount = document.getElementById("desc-char-count"),
  add = document.querySelector('#add'),
  update = document.querySelector('#update'),
  searchBar = document.querySelector('header input'),
  listOut = JSON.parse(localStorage.getItem(listKey) || '[]'),
  display = ['none', 'inline-block'],
  showBtnAdd = show => {add.style.display = display[+show]; update.style.display = display[+!show]},
  F = f => index => {f(index); updateList()},
  remove = index => listOut.splice(index, 1),
  done = index => listOut[index].done = !listOut[index].done

inputTitle.addEventListener('keypress', e => {
  if (e.key === 'Enter') document.querySelector('section').querySelector('button:not([style*="display: none"])').click()
})

inputDesc.addEventListener('keypress', e => {
  if (e.key === 'Enter') document.querySelector('section').querySelector('button:not([style*="display: none"])').click()
})

add.addEventListener('click', F(() => {
  if (!inputTitle.value) {
    inputTitle.style.border = '1px solid red'
    alert('Digite um item para incluir na lista.')
  } else {
    inputTitle.style.border = ''
    listOut.unshift({Task: inputTitle.value, Description: inputDesc.value, done: false})
    inputTitle.value = ''
    inputDesc.value = ''
  }
}))

function updateCharCount(inputElement, maxLength, charCountElement) {
  const currentLength = inputElement.value.length;
  const remaining = maxLength - currentLength;
  charCountElement.innerText = remaining;
}

inputTitle.addEventListener('input', () => {
  const maxLength = 20;
  updateCharCount(inputTitle, maxLength, titleCharCount);
});

inputDesc.addEventListener('input', () => {
  const maxLength = 72;
  updateCharCount(inputDesc, maxLength, descCharCount);
});

searchBar.addEventListener('input', () => {
  const searchBarInput = searchBar.value.toLowerCase(),
    list = listOut.filter(({Task, Description}) => Task.toLowerCase().includes(searchBarInput) || Description.toLowerCase().includes(searchBarInput))
  updateList(list)
})

function edit(index) {
  inputTitle.value = listOut[index].Task
  inputDesc.value = listOut[index].Description
  showBtnAdd(false)
  update.addEventListener('click', () => {
    listOut[index].Task = inputTitle.value
    listOut[index].Description = inputDesc.value
    inputTitle.value = ''
    inputDesc.value = ''
    showBtnAdd(true)
    updateList()
  }, {once: true})
}

function updateList(list = listOut) {
  localStorage.setItem(listKey, JSON.stringify(listOut))
  const listIn = document.querySelector('ul')
  listIn.innerHTML = ''
  list.forEach((value, index) => {
    listIn.innerHTML += `
    <li><span class='task ${value.done ? 'done' : ''}'>${value.Task}</span>
      <span class='description ${value.done ? 'done' : ''}'>${value.Description}</span>
      <div>
        <button id='edit' onclick='edit(${index})' class="bi bi-pencil"/>
        <button id='remove' onclick='F(remove)(${index})' class="bi bi-trash3"/>
        <button id='done' onclick='F(done)(${index})' class="bi bi-check-circle"/>
    </div></li><hr>`
  })
}
updateList()
