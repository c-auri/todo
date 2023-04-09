export function renderProjectSelection(projects: string[]) {
    const selection = document.querySelector('#project-selection')
    
    for (const project of projects) {
        const option = document.createElement('option')
        option.value = project
        option.textContent = project
        selection.appendChild(option)
    }
}