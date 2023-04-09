import DialogHtml from './NewTaskDialog.html'
import { append } from '../Controller'
import { set } from 'date-fns'
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
        const date = getDate(dateInput.value, timeInput.value)

        if (title) {
            append({ id:uuid(), title, project: 'Inbox', description, date: date, hasTime: !!timeInput.value })
        }
    }

    titleInput.value = ''
    dateInput.value = ''
}

function getDate(dateString: string, time: string) {
    let date = new Date(dateString)

    if (!!time) {
        const [ hours, minutes ] = time.split(':').map(token => +token)
        date = set(date, { hours, minutes })
    }

    return date
}