import { Task } from "./Task"
import { deserialize, serialize } from "./Serialization"

export class LocalStorage {
    constructor(projects: string[]) {
        if (!this.#isPopulated()) {
            this.#populate(projects)
        }
    }

    getProjects() {
        const json = localStorage.getItem('projects')
        return JSON.parse(json)
    }

    getTasks(project = '') {
        const json = localStorage.getItem('tasks')
        const tasks = deserialize(json)
        return project ? tasks.filter(task => task.project === project) : tasks
    }

    setTasks(tasks: Task[]) {
        localStorage.setItem('tasks', serialize(tasks))
    }

    #isPopulated() {
        return !!localStorage.getItem('tasks')
    }

    #populate(projects: string[]) {
        localStorage.setItem('tasks', JSON.stringify([]))
        localStorage.setItem('projects', JSON.stringify(projects))
    }
} 