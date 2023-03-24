import './Todo.scss'

export interface Todo {
    title: string
}

export function renderTodo(todo : Todo) {
    const li = document.createElement('li')

    const container = document.createElement('article')
    container.classList.add('todo')

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    container.appendChild(title)
    li.appendChild(container)
    return li
}