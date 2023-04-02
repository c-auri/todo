import { Todo } from '../models/Todo'
import { remove } from '../controller/TodoController'

export function renderTodo(todo : Todo) {
    const li = document.createElement('li')
    li.classList.add('todo')
    li.setAttribute('data-id', ""+todo.id)

    li.innerHTML = `
        <span class="todo__title">${todo.title}</span>
        <span class="todo__date">${todo.date.toDateString()}</span>
        <div class="todo__button-container">
            <button class="button todo__button">x</button>
        </div>
    `

    const deleteButton = li.querySelector('button')
    deleteButton.addEventListener('click', () => remove(todo))

    return li
}