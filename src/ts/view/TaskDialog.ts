import { Task } from "../model/Task"
import { pushTask, getCurrentProject } from "../Controller"
import { v4 as uuid } from 'uuid'
import { set } from 'date-fns'

export function addNewTaskDialogEvents(): void {
    const dialog = document.querySelector('#new-task-dialog') as HTMLDialogElement
    const openButton = document.querySelector('#new-task-button') as HTMLButtonElement
    const confirmButton = document.querySelector('#new-task-confirm-button') as HTMLButtonElement

    openButton.addEventListener('click', showNewTaskDialog)
    confirmButton.addEventListener('click', (e) => submitTask(e, dialog))
}

function showNewTaskDialog(): void {
    const dialog = document.querySelector('#new-task-dialog') as HTMLDialogElement
    resetDialog()
    dialog.showModal()
}

function resetDialog() {
    const dialog = document.querySelector('#new-task-dialog') as HTMLDialogElement

    const headingElement = dialog.querySelector('#new-task-heading') as HTMLSpanElement
    const titleInput = dialog.querySelector('#new-task-title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#new-task-description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#new-task-date') as HTMLInputElement
    const timeInput = dialog.querySelector('#new-task-time') as HTMLInputElement
    
    headingElement.textContent = 'New Task'
    titleInput.value = ''
    dateInput.value = ''
    timeInput.value = ''
    descriptionInput.value = ''
    
    const confirmButton = dialog.querySelector('#new-task-confirm-button') as HTMLButtonElement
    confirmButton.value = 'add'
    confirmButton.textContent = 'Add New Task'
}

function submitTask(event: Event, dialog: HTMLDialogElement): void {
    event.preventDefault()

    const task = getTask()

    if (task) {
        pushTask(task)
    }

    dialog.close()
}

function getTask(): Task | undefined {
    const dialog = document.querySelector('#new-task-dialog') as HTMLDialogElement
    const titleInput = dialog.querySelector('#new-task-title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#new-task-description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#new-task-date') as HTMLInputElement
    const timeInput = dialog.querySelector('#new-task-time') as HTMLInputElement
    
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