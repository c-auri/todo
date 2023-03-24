import './Todo.scss'

let numberOfTodos = 0

export interface Todo {
    id: number
    title: string
}

export function createTodo(title : string) {
    return {
        id: numberOfTodos++,
        title: title
    }
}

export function renderTodo(todo : Todo, deleteTodo : (todo: Element) => void) {
    const li = document.createElement('li')
    li.setAttribute('data-id', ""+todo.id)

    const container = document.createElement('article')
    container.classList.add('todo')

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('todo__button')
    deleteButton.innerHTML = "x"
    deleteButton.addEventListener('click', () => deleteTodo(li))

    container.appendChild(title)
    container.appendChild(deleteButton)
    li.appendChild(container)
    return li
}