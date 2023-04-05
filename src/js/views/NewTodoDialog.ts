import { append } from '../controller/TodoController'
import { Todo } from '../models/Todo'

export function renderNewTodoDialog() {
    const dialog = document.createElement('dialog')
    dialog.classList.add('border', 'rounded-4')

    dialog.innerHTML = getDialogHtml()
    dialog.addEventListener('close', () => submitTodo(dialog))

    return dialog
}

function getDialogHtml() {
    return `
        <form method="dialog" class="container">
            <div class="mb-3 row">
                <label class="form-label">
                    Title
                    <input type="text" class="form-control" id="new-todo__title"></input>
                </label>
                <label class="form-label">
                    Due Date
                    <input type="date" class="form-control" id="new-todo__date"></input>
                </label>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" id="new-todo__confirm-btn" value="add">Add Todo</button>
                <button class="btn btn-outline-secondary">Cancel</button>
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