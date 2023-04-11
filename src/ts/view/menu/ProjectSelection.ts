import { setCurrentProject } from '../../Controller'

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
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-secondary')
    button.type = 'button'
    button.textContent = '+'

    const dialog = document.querySelector('#new-project-dialog') as HTMLDialogElement
    button.addEventListener('click', () => dialog.showModal())

    return button
}