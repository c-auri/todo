import { Task } from "../model/Task"
import { pushTask, editTask as updateTask, getCurrentProject } from "../Controller"
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
const priorityInput = dialog.querySelector('#task-dialog-high-priority') as HTMLInputElement

export function addNewTaskDialogEvents(): void {
    openButton.addEventListener('click', () => showTaskDialog('add'))
    cancelButton.addEventListener('click', () => dialog.close())
    form.addEventListener('submit', submitTask)
}

export function showTaskDialog(mode: 'add' | 'update', task: Task = undefined): void {
    dialog.setAttribute('data-id', mode === 'add' ? undefined : task.id)
    dialog.setAttribute('data-status', task?.isDone ? 'done' : undefined)
    dialog.setAttribute('data-mode', mode)
    form.classList.remove('was-validated')

    headingElement.textContent = mode === 'add' ? 'New Task' : 'Update Task'
    titleInput.value = task?.title ?? ''
    dateInput.value = isValid(task?.date) ? format(task.date, 'yyyy-MM-dd') : ''
    timeInput.value = task?.hasTime ? format(task.date, "HH:mm") : ''
    descriptionInput.value = task?.description ?? ''
    priorityInput.checked = task?.hasHighPriority ?? false

    confirmButton.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Task`

    dialog.showModal()
}

function submitTask(event: Event): void {
    if (!form.checkValidity()) {
        event.preventDefault()
        form.classList.add('was-validated')
        return
    }

    const mode = document.querySelector('#task-dialog').getAttribute('data-mode')
    const task = getTask()

    if (mode === 'add') {
        pushTask(task)
    } else if (mode === 'update') {
        updateTask(task)
    }
}

function getTask(): Task {
    const { date, hasTime } = getDueDateInfo(dateInput.value, timeInput.value)

    return {
        id: dialog.getAttribute('data-id'),
        isDone: dialog.getAttribute('data-status') === 'done',
        title: titleInput.value,
        project: getCurrentProject(),
        description: descriptionInput.value,
        date,
        hasTime,
        hasHighPriority: priorityInput.checked
    }
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