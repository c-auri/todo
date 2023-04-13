import { Task } from './model/Task'
import { LocalStorage } from './model/LocalStorage'
import { initializeMenu, renderProjectOptions } from './view/ProjectMenu'
import { renderTaskList } from './view/TaskList'

const defaultProject = 'Inbox'

let storage: LocalStorage

export function initialize():void {
    storage = new LocalStorage(defaultProject)
    initializeMenu()
    renderCurrentProject()
}

export function getCurrentProject(): string {
    return storage.getCurrentProject()
}

export function setCurrentProject(project: string): void {
    storage.setCurrentProject(project)
    renderCurrentProject()
}

export function pushProject(project: string): void {
    storage.pushProject(project)
    storage.setCurrentProject(project)
    renderCurrentProject()
}

export function pushTask(task: Task): void {
    storage.pushTask(task)
    renderCurrentProject()
}

export function editTask(newTask: Task): void {
    storage.editTask(newTask)
    renderCurrentProject()
}

export function removeTask(id: string): void {
    storage.removeTask(id)
    renderCurrentProject()
}

function renderCurrentProject(): void {
    const currentProject = storage.getCurrentProject()
    renderProjectOptions(storage.getProjects(), currentProject)
    renderTaskList(storage.getTasks(currentProject))
}