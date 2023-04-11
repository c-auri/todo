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
    storage = new LocalStorage([currentProject])
    initializeMenu()
    renderCurrentProject()
}

export function getCurrentProject(): string {
    return currentProject
}

export function setCurrentProject(project: string) {
    currentProject = project
    renderCurrentProject()
}

export function pushProject(title: string) {
    const projects = storage.getProjects()
    projects.push(title)
    storage.setProjects(projects)
    renderCurrentProject()
}

export function pushTask(task: Task) {
    const tasks = storage.getTasks()
    tasks.push(task)
    storage.setTasks(tasks)
    renderCurrentProject()
}

export function removeTask(id: string) {
    const tasks = storage.getTasks()
    const index = tasks.findIndex(task => task.id === id)
    tasks.splice(index, 1)
    storage.setTasks(tasks)
    renderCurrentProject()
}

function renderCurrentProject() {
    renderProjectOptions(storage.getProjects(), currentProject)
    renderTaskList(storage.getTasks(currentProject))
}