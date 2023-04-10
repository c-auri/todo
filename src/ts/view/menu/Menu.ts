import { createProjectForm } from "./ProjectSelection"
import { createNewTaskButton } from "./NewTaskButton"

export function renderMenu(projects: string[], currentProject: string): void {
    const selectionContainer = document.querySelector('#project-selection-container') as HTMLDivElement
    selectionContainer.innerHTML = ''
    selectionContainer.appendChild(createProjectForm(projects, currentProject))

    const buttonContainer = document.querySelector('#new-task-container')
    buttonContainer.innerHTML = ''
    buttonContainer.appendChild(createNewTaskButton(currentProject))
}