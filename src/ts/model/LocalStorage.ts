import { Task } from "./Task"
import { deserialize, serialize } from "./Serialization"

export class LocalStorage {
    constructor() {
        if (!this.#isPopulated()) {
            this.#populate()
        }
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

    #populate() {
        localStorage.setItem('tasks', JSON.stringify([]))
        localStorage.setItem('projects', 'Inbox')
    }
} 