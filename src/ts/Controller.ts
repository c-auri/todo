import Task from './model/Task'
import { renderTaskList } from './view/TaskList'
import { LocalStorage } from './model/LocalStorage'

let storage: LocalStorage

export function initialize() {
    storage = new LocalStorage()
    renderTaskList(storage.getProject())
}

/**
 * Appends task to the current project.
 * @param task The Todo to append.
 */
export function append(task: Task) {
    const currentProject = storage.getProject()
    currentProject.add(task)
    renderTaskList(currentProject)
    storage.setProject(currentProject)
}

/**
 * Removes task from the current project.
 * @param task The Todo to remove.
 */
export function remove(id: string) {
    const currentProject = storage.getProject()
    currentProject.remove(id)
    renderTaskList(currentProject)
    storage.setProject(currentProject)
}