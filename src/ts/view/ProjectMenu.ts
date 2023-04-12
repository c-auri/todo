import { setCurrentProject } from '../Controller'
import { addProjectDialogEvents } from "./ProjectDialog"
import { addNewTaskDialogEvents } from "./TaskDialog"

const selection = document.querySelector('#project-selection') as HTMLSelectElement

export function initializeMenu(): void {
    addProjectDialogEvents()
    addNewTaskDialogEvents()
}

export function renderProjectOptions(projects: string[], currentProject: string): void {
    selection.innerHTML = ''

    for (const project of projects) {
        const option = document.createElement('option')
        option.value = project
        option.textContent = project
        option.selected = project === currentProject

        selection.appendChild(option)
    }

    selection.addEventListener('change', () => setCurrentProject(selection.value))
}