import { Task, Project } from './Models'
import { renderTaskList } from './components/TaskList'

let currentProject : Project

export function initialize() {
    currentProject = new Project("Inbox")
    renderTaskList(currentProject)
}

/**
 * Appends task to the current project.
 * @param task The Todo to append.
 */
export function append(task: Task) {
    currentProject.add(task)
    renderTaskList(currentProject)
}

/**
 * Removes task from the current project.
 * @param task The Todo to remove.
 */
export function remove(task: Task) {
    currentProject.remove(task)
    renderTaskList(currentProject)
}