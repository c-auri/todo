import { renderProjectForm } from "./ProjectSelection"
import { renderNewTaskButton } from "./NewTaskButton"

export function renderMenu(projects: string[], currentProject: string) {
    const selectionContainer = document.querySelector('#project-selection-container') as HTMLDivElement
    selectionContainer.innerHTML = ''
    selectionContainer.appendChild(renderProjectForm(projects))

    const buttonContainer = document.querySelector('#new-task-container')
    buttonContainer.innerHTML = ''
    buttonContainer.appendChild(renderNewTaskButton(currentProject))
}