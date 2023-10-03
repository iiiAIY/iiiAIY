//Add
const input = document.getElementById('main-input')
const addBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const notes = [
    {
        title: 'Первая заметка',
        completed: false,
    },
    {
        title: 'Вторая заметка',
        completed: false,
    }
]
    
function getNoteTemplate (note, index) {
    return `
        <li 
        class="notes-list__item">
            <span class = "${note.completed ? 'note-done' : ''}">${note.title}</span>
            <span class="action">
                <span class="done ${note.completed ? 'done--true' : ''} material-icons-outlined" data-index="${index}" data-type="toggle">done</span>
                <span class="close material-icons-outlined" data-index="${index}" data-type = "remove">close</span>
            </span>
        </li>
    `
}

listElement.onclick = function (event) {
    console.log(event.target.dataset.index)
    // if (event.target.dataset.index) {
    //     const index = parseInt(event.target.dataset.index)
    //     const type = event.target.dataset.type
        
    //     if (type === "toggle") {
    //         notes[index].completed = !notes[index].completed
    //     } else if (type === "remove") {
    //         notes.splice(index,1)
    //     }
    //     render()
    // }
}

function render () {
    listElement.innerHTML = ''
    if (notes.length === 0) {
        listElement.innerHTML = '<p>Нет элементов </p>'
    }
    notes.map( (note,ind) => listElement.insertAdjacentHTML('beforeend', getNoteTemplate(note,ind)))    
}

addBtn.onclick = function () {
    if (input.value.length === 0) {
        return
    }
    const newNote = {
        title: input.value,
        completed: false
    }
    notes.push(newNote)
    render()
    input.value = ""
}

render()
