import { Task } from './model/Task'
import { LocalStorage } from './model/LocalStorage'
import { renderTasks } from './view/TaskList'
import { renderProjectSelection } from './view/ProjectSelector'
import { renderNewTaskButton } from './view/NewTask'

let storage: LocalStorage
const currentProject = 'Inbox'

export function initialize() {
    storage = new LocalStorage([currentProject])
    renderProjectSelection(storage.getProjects())
    const newButton = renderNewTaskButton(storage.getProjects())
    document.querySelector('#menu').appendChild(newButton)
    renderCurrentProject()
}

/**
 * Appends task to the current project.
 * @param task The Todo to append.
 */
export function append(task: Task) {
    const tasks = storage.getTasks()
    tasks.push(task)
    storage.setTasks(tasks)
    renderCurrentProject()
}

/**
 * Removes task from the current project.
 * @param task The Todo to remove.
 */
export function remove(id: string) {
    const tasks = storage.getTasks()
    const index = tasks.findIndex(task => task.id === id)
    tasks.splice(index, 1)
    storage.setTasks(tasks)
    renderCurrentProject()
}

function renderCurrentProject() {
    const tasks = storage.getTasks(currentProject)
    renderTasks(tasks)
}