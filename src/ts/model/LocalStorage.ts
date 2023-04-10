import { Task } from "./Task"
import { deserialize, serialize } from "./Serialization"

export class LocalStorage {
    constructor(projects: string[]) {
        if (!this.#isPopulated()) {
            this.#populate(projects)
        }
    }

    getProjects(): string[] {
        const json = localStorage.getItem('projects')
        return JSON.parse(json)
    }

    setProjects(projects: string[]): void {
        localStorage.setItem('projects', JSON.stringify(projects))
    }

    getTasks(project = ''): Task[] {
        const tasks = deserialize(localStorage.getItem('tasks'))
        return project ? tasks.filter(task => task.project === project) : tasks
    }

    setTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', serialize(tasks))
    }

    #isPopulated(): boolean {
        return !!localStorage.getItem('tasks')
    }

    #populate(projects: string[]): void {
        localStorage.setItem('tasks', JSON.stringify([]))
        localStorage.setItem('projects', JSON.stringify(projects))
    }
}