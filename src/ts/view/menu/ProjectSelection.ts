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
    const button = document.createElement('button')
    button.classList.add('btn', 'btn-secondary')
    button.type = 'button'
    button.textContent = '+'
    return button
}