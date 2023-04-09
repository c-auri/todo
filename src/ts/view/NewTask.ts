import Task from '../model/Task'
import DialogHtml from './NewTaskDialog.html'
import { append } from '../Controller'
import { v4 as uuid } from 'uuid'

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
    dialog.style.width = 'min(100vw, 28rem)'
    dialog.addEventListener('close', () => submitTask(dialog))

    return dialog
}

function submitTask(dialog: HTMLDialogElement) {
    const titleInput = dialog.querySelector('#new-task__title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#new-task__description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#new-task__date') as HTMLInputElement
    const timeInput = dialog.querySelector('#new-task__time') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        const title = titleInput.value
        const description = descriptionInput.value
        const date = dateInput.value
        const time = timeInput.value

        if (title) {
            append(new Task(uuid(), title, description, new Date(date), time))
        }
    }

    titleInput.value = ''
    dateInput.value = ''
}