import { Task } from "./Task"
import { deserialize, serialize } from "./Serialization"
import { v4 as uuid } from 'uuid'

export class LocalStorage {
    constructor(defaultProject: string) {
        if (!this.#isPopulated()) {
            this.#populate(defaultProject)
        }
    }

    getProjects(): string[] {
        const json = localStorage.getItem('projects')
        return JSON.parse(json)
    }

    pushProject(project: string) {
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

    editTask(task: Task): void {
        this.removeTask(task.id)
        this.pushTask(task)
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
    }

    #setTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', serialize(tasks))
    }
}