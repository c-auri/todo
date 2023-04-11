import DialogHtml from './NewTaskDialog.html'
import { appendTask } from '../../Controller'
import { set } from 'date-fns'
import { v4 as uuid } from 'uuid'

export function createNewTaskButton(project: string): HTMLButtonElement {
    const button = document.createElement('button')

    button.id = 'new-task__btn'
    button.classList.add('btn')
    button.classList.add('btn-success')
    button.innerHTML = 'Add&nbsp;New&nbsp;Task'
    button.type = 'button'

    const dialog = createDialog(project)
    document.body.appendChild(dialog)
    button.addEventListener('click', () => dialog.showModal())

    return button
}

function createDialog(project: string): HTMLDialogElement {
    const dialog = document.createElement('dialog')

    dialog.innerHTML = DialogHtml
    dialog.style.width = 'min(100vw, 28rem)'
    dialog.classList.add('border', 'rounded-4')
    dialog.addEventListener('close', () => submitTask(dialog, project))

    return dialog
}

function submitTask(dialog: HTMLDialogElement, project: string): void {
    const titleInput = dialog.querySelector('#new-task-title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#new-task-description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#new-task-date') as HTMLInputElement
    const timeInput = dialog.querySelector('#new-task-time') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        const title = titleInput.value
        const { date, hasTime } = getDueDateInfo(dateInput.value, timeInput.value)

        if (title) {
            appendTask({
                id:uuid(),
                title,
                project,
                description: descriptionInput.value,
                date: date,
                hasTime: hasTime })
        }
    }

    titleInput.value = ''
    dateInput.value = ''
}

function getDueDateInfo(dateString: string, time: string): DueDateInfo {
    const hasTime = !!time
    let date = new Date(dateString)

    if (hasTime) {
        const [ hours, minutes ] = time.split(':').map(token => +token)
        date = set(date, { hours, minutes })
    }

    return { date, hasTime }
}

interface DueDateInfo {
    date: Date
    hasTime: boolean
}