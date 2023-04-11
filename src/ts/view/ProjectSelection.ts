import { setCurrentProject } from '../Controller'

export function renderProjectOptions(projects: string[], currentProject: string): void {
    const selection = document.querySelector('#project-selection') as HTMLSelectElement
    selection.innerHTML = ''

    for (const project of projects) {
        const option = document.createElement('option')
        option.value = project
        option.textContent = project

        if (project === currentProject) {
            option.selected = true
        }

        selection.appendChild(option)
    }
    
    selection.addEventListener('change', () => {
        setCurrentProject(selection.value)
    })
}