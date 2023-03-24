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

export function renderTodo(todo : Todo) {
    const li = document.createElement('li')

    const container = document.createElement('article')
    container.classList.add('todo')
    container.setAttribute('data-id', ""+todo.id)

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    container.appendChild(title)
    li.appendChild(container)
    return li
}