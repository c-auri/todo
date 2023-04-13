import { Task } from "./Task"
import { deserialize, serialize } from "./Serialization"
import { v4 as uuid } from 'uuid'

export class LocalStorage {
    constructor(defaultProject: string) {
        if (!this.#isPopulated()) {
            this.#populate(defaultProject)
        }
    }

    getCurrentProject(): string {
        return localStorage.getItem('currentProject')
    }

    setCurrentProject(project: string): void {
        localStorage.setItem('currentProject', project)
    }

    getProjects(): string[] {
        const json = localStorage.getItem('projects')
        return JSON.parse(json)
    }

    pushProject(project: string): void {
        const projects = this.getProjects()
        projects.push(project)
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    getTasks(project = ''): Task[] {
        const tasks = deserialize(localStorage.getItem('tasks'))
        return project ? tasks.filter(task => task.project === project) : tasks
    }

    pushTask(task: Task): void {
        task.id = uuid()
        const tasks = this.getTasks()
        tasks.push(task)
        this.#setTasks(tasks)
    }

    editTask(newTask: Task): void {
        const tasks = this.getTasks()
        const index = tasks.findIndex(task => task.id === newTask.id)

        if (index === -1) {
            throw new Error(`ID does not exist in storage: ${newTask.id}`)
        }

        tasks.splice(index, 1, newTask)
        this.#setTasks(tasks)
    }

    removeTask(id: string): void {
        const tasks = this.getTasks()
        const index = tasks.findIndex(task => task.id === id)

        if (index === -1) {
            throw new Error(`ID does not exist in storage: ${id}`)
        }

        tasks.splice(index, 1)
        this.#setTasks(tasks)
    }

    #isPopulated(): boolean {
        return !!localStorage.getItem('tasks')
    }

    #populate(defaultProject: string): void {
        this.#setTasks([])
        localStorage.setItem('projects', JSON.stringify([ defaultProject ]))
        localStorage.setItem('currentProject', defaultProject)
    }

    #setTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', serialize(tasks))
    }
}