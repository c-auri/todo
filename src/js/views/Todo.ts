import { Todo } from '../models/Todo'
import { remove } from '../controller/TodoController'

export function renderTodo(todo : Todo) {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('row', 'row-cols-3', 'gx-2', 'mb-3', 'rounded', 'border', 'border-primary')
    todoDiv.setAttribute('data-id', ""+todo.id)

    todoDiv.innerHTML = `
        <span class="col">${todo.title}</span>
        <span class="col">${todo.dueDate}</span>
        <span class="col">
            <button class="btn btn-light">x</button>
        </span>
    `

    const deleteButton = todoDiv.querySelector('button')
    deleteButton.addEventListener('click', () => remove(todo))

    return todoDiv
}