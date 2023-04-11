import { appendTask, getCurrentProject } from "../../Controller"
import { v4 as uuid } from 'uuid'
import { set } from 'date-fns'

export function addTaskDialogEvent(): void {
    const dialog = document.querySelector('#new-task-dialog') as HTMLDialogElement
    dialog.addEventListener('close', () => submitTask(dialog))
}

function submitTask(dialog: HTMLDialogElement): void {
    const titleInput = dialog.querySelector('#new-task-title') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#new-task-description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#new-task-date') as HTMLInputElement
    const timeInput = dialog.querySelector('#new-task-time') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        const title = titleInput.value
        const { date, hasTime } = getDueDateInfo(dateInput.value, timeInput.value)
        const project = getCurrentProject()

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