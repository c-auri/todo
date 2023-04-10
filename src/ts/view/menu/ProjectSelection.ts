import DialogHtml from './ProjectSelectionDialog.html'
import { setCurrentProject, appendProject } from '../../Controller'

export function createProjectForm(projects: string[], current: string): HTMLDivElement {
    const div = document.createElement('div')
    div.classList.add('input-group')

    const label = document.createElement('span')
    label.classList.add('input-group-text')
    label.textContent = 'Project'
    
    div.appendChild(label)
    div.appendChild(createSelection(projects, current))
    div.appendChild(createButton())

    return div
}

function createSelection(projects: string[], current: string): HTMLSelectElement {
    const selection = document.createElement('select')
    selection.classList.add('form-select')
    selection.id = 'project-selection'
    selection.style.minWidth = '10rem'

    for (const project of projects) {
        const option = document.createElement('option')
        option.value = project
        option.textContent = project

        if (project === current) {
            option.selected = true
        }

        selection.appendChild(option)
    }

    selection.addEventListener('change', () => {
        setCurrentProject(selection.value)
    })

    return selection
}

function createButton(): HTMLButtonElement {
    const dialog = createDialog()
    document.body.appendChild(dialog)

    const button = document.createElement('button')
    button.classList.add('btn', 'btn-secondary')
    button.type = 'button'
    button.textContent = '+'
    button.addEventListener('click', () => dialog.showModal())

    return button
}

function createDialog(): HTMLDialogElement {
    const dialog = document.createElement('dialog')

    dialog.innerHTML = DialogHtml
    dialog.style.width = 'min(100vw, 28rem)'
    dialog.classList.add('border', 'rounded-4')
    dialog.addEventListener('close', () => submitProject(dialog))

    return dialog
}

function submitProject(dialog: HTMLDialogElement): void {
    const titleInput = document.querySelector('#new-project__title') as HTMLInputElement

    if (dialog.returnValue === 'add') {
        appendProject(titleInput.value)
    }

    titleInput.value = ''
}