import { Task } from './model/Task'
import { LocalStorage } from './model/LocalStorage'
import { initializeMenu } from './view/Menu'
import { renderProjectOptions } from './view/ProjectSelection'
import { renderTaskList } from './view/TaskList'

const defaultProject = 'Inbox'

let storage: LocalStorage
let currentProject: string

export function initialize() {
    currentProject = defaultProject
    storage = new LocalStorage(defaultProject)
    initializeMenu()
    renderCurrentProject()
}

export function getCurrentProject(): string {
    return currentProject
}

export function setCurrentProject(project: string): void {
    currentProject = project
    renderCurrentProject()
}

export function pushProject(title: string): void {
    storage.pushProject(title)
    currentProject = title
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
    renderProjectOptions(storage.getProjects(), currentProject)
    renderTaskList(storage.getTasks(currentProject))
}