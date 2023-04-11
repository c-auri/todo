import { createProjectForm } from "./ProjectSelection"
import { addProjectDialogEvent } from "./ProjectDialog"
import { addTaskDialogEvents } from "./TaskDialog"

export function renderMenu(projects: string[], currentProject: string): void {
    const selectionContainer = document.querySelector('#project-selection-container') as HTMLDivElement
    selectionContainer.innerHTML = ''
    selectionContainer.appendChild(createProjectForm(projects, currentProject))
}

export function initializeMenu() {
    addProjectDialogEvent()
    addTaskDialogEvents()
}