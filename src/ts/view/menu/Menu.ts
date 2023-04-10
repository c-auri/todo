import { renderProjectSelection } from "./ProjectSelector"
import { renderNewTaskButton } from "./NewTaskButton"

export function renderMenu(projects: string[], currentProject: string) {
    const menu = document.querySelector('#menu') as HTMLDivElement
    menu.innerHTML = ''
    menu.appendChild(renderProjectSelection(projects))
    menu.appendChild(renderNewTaskButton(currentProject))
}