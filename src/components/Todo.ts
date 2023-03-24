import { Todo } from '../models/Todo'

import './Todo.scss'

export function renderTodo(todo : Todo, deleteTodo : (todo: Element) => void) {
    const li = document.createElement('li')
    li.classList.add('todo')
    li.setAttribute('data-id', ""+todo.id)

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('todo__button')
    deleteButton.innerHTML = "x"
    deleteButton.addEventListener('click', () => deleteTodo(li))

    li.appendChild(title)
    li.appendChild(deleteButton)
    return li
}