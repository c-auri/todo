import { append } from '../Controller'
import Task from '../model/Task'
import DialogHtml from './NewTaskDialog.html'

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
    dialog.innerHTML = DialogHtml
    dialog.addEventListener('close', () => submitTask(dialog))

    return dialog
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