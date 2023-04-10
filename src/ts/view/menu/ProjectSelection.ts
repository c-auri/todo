import DialogHtml from './ProjectSelectionDialog.html'
import { appendProject } from '../../Controller'

export function renderProjectForm(projects: string[]) {
    const group = document.createElement('div')
    group.classList.add('input-group')

    const label = document.createElement('span')
    label.classList.add('input-group-text')
    label.textContent = 'Project'
    
    group.appendChild(label)
    group.appendChild(renderSelection(projects))
    group.appendChild(renderButton())

    return group
}

function renderSelection(projects: string[]) {
    const selection = document.createElement('select')
    selection.classList.add('form-select')
    selection.id = 'project-selection'
    selection.style.minWidth = '10rem'

    for (const project of projects) {
        const option = document.createElement('option')
        option.value = project
        option.textContent = project
        selection.appendChild(option)
    }

    return selection
}

function renderButton() {
    const dialog = renderDialog()
    document.body.appendChild(dialog)

    const button = document.createElement('button')
    button.classList.add('btn', 'btn-secondary')
    button.type = 'button'
    button.textContent = '+'
    button.addEventListener('click', () => dialog.showModal())
    return button
}

function renderDialog() {
    const dialog = document.createElement('dialog')

    dialog.innerHTML = DialogHtml
    dialog.style.width = 'min(100vw, 28rem)'
    dialog.classList.add('border', 'rounded-4')
    dialog.addEventListener('close', () => submitProject(dialog))

    return dialog
}

function submitProject(dialog: HTMLDialogElement) {
    const titleInput = document.querySelector('#new-project__title') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        appendProject(titleInput.value)
    }

    titleInput.value = ''
}