import { Task } from "../model/Task"
import { pushTask, editTask as updateTask, getCurrentProject } from "../Controller"
import { v4 as uuid } from 'uuid'
import { set, isValid, format } from 'date-fns'

const dialog = document.querySelector('#task-dialog') as HTMLDialogElement
const form = document.querySelector('#task-dialog-form') as HTMLFormElement
const openButton = document.querySelector('#submit-task-button') as HTMLButtonElement
const cancelButton = document.querySelector('#task-dialog-cancel-button') as HTMLButtonElement
const confirmButton = dialog.querySelector('#task-dialog-confirm-button') as HTMLButtonElement

const headingElement = dialog.querySelector('#task-dialog-heading') as HTMLSpanElement
const titleInput = dialog.querySelector('#task-dialog-title') as HTMLInputElement
const descriptionInput = dialog.querySelector('#task-dialog-description') as HTMLTextAreaElement
const dateInput = dialog.querySelector('#task-dialog-date') as HTMLInputElement
const timeInput = dialog.querySelector('#task-dialog-time') as HTMLInputElement

export function addNewTaskDialogEvents(): void {
    openButton.addEventListener('click', () => showTaskDialog('add'))
    cancelButton.addEventListener('click', () => dialog.close())
    form.addEventListener('submit', submitTask)
}

export function showTaskDialog(mode: 'add' | 'update', task: Task = undefined): void {
    dialog.setAttribute('data-mode', mode)
    form.classList.remove('was-validated')
    
    headingElement.textContent = mode === 'add' ? 'New Task' : 'Update Task'
    titleInput.value = task ? task.title : ''
    dateInput.value = task ? isValid(task.date) ? format(task.date, 'yyyy-MM-dd') : '' : ''
    timeInput.value = task ? task.hasTime ? format(task.date, "HH:mm") : '' : ''
    descriptionInput.value = task ? task.description : ''

    confirmButton.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Task`
    
    dialog.showModal()
}

function submitTask(event: Event): void {
    if (!form.checkValidity()) {
        event.preventDefault()
        form.classList.add('was-validated')
        return
    }

    const task = getTask()

    if (task) {
        const mode = document.querySelector('#task-dialog').getAttribute('data-mode')

        if (mode === 'add') {
            pushTask(task)
        } else if (mode === 'update') {
            updateTask(task)
        }
    }
}

function getTask(): Task | undefined {
    const { date, hasTime } = getDueDateInfo(dateInput.value, timeInput.value)

    return titleInput.value ? {
        id: uuid(),
        title: titleInput.value,
        project: getCurrentProject(),
        description: descriptionInput.value,
        date,
        hasTime
    } : undefined
}

function getDueDateInfo(dateString: string, time: string): { date: Date, hasTime: boolean } {
    const hasTime = !!time
    let date = new Date(dateString)

    if (hasTime) {
        const [ hours, minutes ] = time.split(':').map(token => +token)
        date = set(date, { hours, minutes })
    }

    return { date, hasTime }
}