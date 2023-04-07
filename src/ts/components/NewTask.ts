import { append } from '../Controller'
import { Task } from '../Models'

export function renderNewButton(dialog: HTMLDialogElement) {
    const newButton = document.createElement('button')

    newButton.id = 'new-task__btn'
    newButton.classList.add('btn')
    newButton.classList.add('btn-primary')
    newButton.innerHTML = 'Add New Task'
    newButton.addEventListener('click', () => dialog.showModal())

    return newButton
}

export function renderNewTaskDialog() {
    const dialog = document.createElement('dialog')

    dialog.classList.add('border', 'rounded-4')
    dialog.innerHTML = getDialogHtml()
    dialog.addEventListener('close', () => submitTask(dialog))

    return dialog
}

function getDialogHtml() {
    return `
        <form method="dialog" class="container">
            <div class="mb-3 row">
                <label class="form-label">
                    Title
                    <input type="text" class="form-control" id="new-task__title"></input>
                </label>
                <label class="form-label">
                    Due Date
                    <input type="date" class="form-control" id="new-task__date"></input>
                </label>
            </div>
            <div class="mb-3">
                <button class="btn btn-primary" id="new-task__confirm-btn" value="add">Add task</button>
                <button class="btn btn-outline-secondary">Cancel</button>
            </div>
        </form>
    `
}

function submitTask(dialog: HTMLDialogElement) {
    const titleInput = dialog.querySelector('#new-task__title') as HTMLInputElement
    const dateInput = dialog.querySelector('#new-task__date') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        const title = titleInput.value

        if (title) {
            append(new Task(title, new Date(dateInput.value)))
        }
    }

    titleInput.value = ''
    dateInput.value = ''
}