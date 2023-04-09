import { Task } from "./Task"
import { deserialize, serialize } from "./Serialization"

export class LocalStorage {
    constructor() {
        if (!this.#isPopulated()) {
            this.#populate()
        }
    }

    getTasks() {
        const json = localStorage.getItem('tasks')
        return deserialize(json)
    }

    setTasks(tasks: Task[]) {
        localStorage.setItem('tasks', serialize(tasks))
    }

    #isPopulated() {
        return !!localStorage.getItem('tasks')
    }

    #populate() {
        localStorage.setItem('tasks', JSON.stringify([]))
    }
}