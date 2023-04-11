import { Task } from "../model/Task"
import { pushTask, editTask as updateTask, getCurrentProject } from "../Controller"
import { v4 as uuid } from 'uuid'
import { set, isValid, format } from 'date-fns'

export function addNewTaskDialogEvents(): void {
    const dialog = document.querySelector('#task-dialog') as HTMLDialogElement
    const openButton = document.querySelector('#new-task-button') as HTMLButtonElement
    const confirmButton = document.querySelector('#task-dialog-confirm-button') as HTMLButtonElement

    openButton.addEventListener('click', () => showTaskDialog('add'))
    confirmButton.addEventListener('click', (e) => submitTask(e, dialog))
}

export function showTaskDialog(mode: 'add' | 'update', task: Task = undefined): void {
    const dialog = document.querySelector('#task-dialog') as HTMLDialogElement
    resetDialog(mode, task)
    dialog.showModal()
}

function resetDialog(mode: 'add' | 'update', task: Task) {
    const dialog = document.querySelector('#task-dialog') as HTMLDialogElement

    const headingElement = dialog.querySelector('#task-dialog-heading') as HTMLSpanElement
    const titleInput = dialog.querySelector('#task-dialog-title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#task-dialog-description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#task-dialog-date') as HTMLInputElement
    const timeInput = dialog.querySelector('#task-dialog-time') as HTMLInputElement
    
    headingElement.textContent = mode === 'add' ? 'New Task' : 'Update Task'
    titleInput.value = task ? task.title : ''
    dateInput.value = task ? isValid(task.date) ? format(task.date, 'yyyy-MM-dd') : '' : ''
    timeInput.value = task ? task.hasTime ? format(task.date, "hh:mm") : '' : ''
    descriptionInput.value = task ? task.description : ''
    
    const confirmButton = dialog.querySelector('#task-dialog-confirm-button') as HTMLButtonElement
    confirmButton.value = mode
    confirmButton.textContent = `${mode.charAt(0).toUpperCase() + mode.slice(1)} Task`
}

function submitTask(event: Event, dialog: HTMLDialogElement): void {
    event.preventDefault()

    const task = getTask()

    if (task) {
        const button = event.target as HTMLButtonElement

        if (button.textContent.includes('Add')) {
            pushTask(task)
        } else if (button.textContent.includes('Update')) {
            updateTask(task)
        }
    }

    dialog.close()
}

function getTask(): Task | undefined {
    const dialog = document.querySelector('#task-dialog') as HTMLDialogElement
    const titleInput = dialog.querySelector('#task-dialog-title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#task-dialog-description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#task-dialog-date') as HTMLInputElement
    const timeInput = dialog.querySelector('#task-dialog-time') as HTMLInputElement
    
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