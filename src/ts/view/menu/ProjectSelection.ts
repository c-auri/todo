export function renderProjectSelection(projects: string[]) {
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