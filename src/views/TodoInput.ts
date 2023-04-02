import './TodoInput.scss'

import { appendTodo } from '../controller/TodoController'
import { createTodo } from '../models/Todo'

export function createTodoInput() {
    const div = document.createElement('div')
    const dialog = document.createElement('dialog')

    dialog.innerHTML = `
        <form method='dialog' class='new-todo'>
            <div class='new-todo__inputs'>
                <label class='new-todo__label'>
                    Title
                    <input type='text' class='new-todo__input' id='new-todo__title'></input>
                </label>
            </div>
            <div class='new-todo__buttons'>
                <button class="button" value='cancel'>Cancel</button>
                <button class="button" id='new-todo__confirm-btn' value=''>Add</button>
            </div>
        </form>
    `

    dialog.addEventListener('close', () => {
        const titleInput = dialog.querySelector('#new-todo__title') as HTMLInputElement
        const title = titleInput.value

        if (title) {
            appendTodo(createTodo(title))
        }

        titleInput.value = ''
    })

    const newButton = document.createElement('button')
    newButton.id = 'new-todo__btn'
    newButton.classList.add('button')
    newButton.classList.add('button--new')
    newButton.innerHTML = 'Add New Todo'
    newButton.addEventListener('click', () => dialog.showModal())

    div.appendChild(dialog)
    div.appendChild(newButton)

    return div
}