import { append } from '../controller/TodoController'
import { Todo } from '../models/Todo'

export function renderNewTodoDialog() {
    const dialog = document.createElement('dialog')

    dialog.innerHTML = getDialogHtml()
    dialog.addEventListener('close', () => submitTodo(dialog))

    return dialog
}

function getDialogHtml() {
    return `
        <form method='dialog' class='new-todo'>
            <div class='new-todo__inputs'>
                <label class='new-todo__label'>
                    Title
                    <input type='text' class='new-todo__input' id='new-todo__title'></input>
                </label>
                <label class='new-todo__label'>
                    Due Date
                    <input type='date' class='new-todo__input' id='new-todo__date'></input>
                </label>
            </div>
            <div class='new-todo__buttons'>
                <button class="button">Cancel</button>
                <button class="button" id='new-todo__confirm-btn' value='add'>Add</button>
            </div>
        </form>
    `
}

function submitTodo(dialog: HTMLDialogElement) {
    const titleInput = dialog.querySelector('#new-todo__title') as HTMLInputElement
    const dateInput = dialog.querySelector('#new-todo__date') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        const title = titleInput.value

        if (title) {
            append(new Todo(title, new Date(dateInput.value)))
        }
    }

    titleInput.value = ''
    dateInput.value = ''
}