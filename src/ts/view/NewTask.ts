import DialogHtml from './NewTaskDialog.html'
import { append } from '../Controller'
import { set } from 'date-fns'
import { v4 as uuid } from 'uuid'

export function renderNewTaskButton(projects: string[]) {
    const newButton = document.createElement('button')

    newButton.id = 'new-task__btn'
    newButton.classList.add('btn')
    newButton.classList.add('btn-primary')
    newButton.innerHTML = 'Add New Task'

    const dialog = renderDialog(projects)
    document.body.appendChild(dialog)
    newButton.addEventListener('click', () => dialog.showModal())

    return newButton
}

function renderDialog(projects: string[]) {
    const dialog = document.createElement('dialog')

    dialog.innerHTML = DialogHtml
    dialog.style.width = 'min(100vw, 28rem)'
    dialog.classList.add('border', 'rounded-4')
    dialog.addEventListener('close', () => submitTask(dialog))

    const projectSelection = dialog.querySelector('#new-task__project') as HTMLSelectElement
    addProjects(projectSelection, projects)

    return dialog
}

function addProjects(select: HTMLSelectElement, projects: string[]) {
    for (const project of projects) {
        const option = document.createElement('option')
        option.value = project
        option.textContent = project
        select.appendChild(option)
    }
}

function submitTask(dialog: HTMLDialogElement) {
    const titleInput = dialog.querySelector('#new-task__title') as HTMLInputElement
    const projectInput = dialog.querySelector('#new-task__project') as HTMLInputElement
    const descriptionInput = dialog.querySelector('#new-task__description') as HTMLTextAreaElement
    const dateInput = dialog.querySelector('#new-task__date') as HTMLInputElement
    const timeInput = dialog.querySelector('#new-task__time') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        const title = titleInput.value
        const project = projectInput.value
        const description = descriptionInput.value
        const date = getDate(dateInput.value, timeInput.value)

        if (title) {
            append({ id:uuid(), title, project, description, date: date, hasTime: !!timeInput.value })
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