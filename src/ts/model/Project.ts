import Task from "./Task"

export default class Project {
    #title: string
    #tasks: Task[]

    constructor(title: string, tasks: Task[] = []) {
        this.#title = title
        this.#tasks = tasks
    }

    get title() {
        return this.#title
    }

    get tasks() {
        return this.#tasks
    }

    get isEmpty() {
        return this.#tasks.length === 0
    }

    add(task: Task) {
        this.#tasks.push(task)
    }

    remove(id: number) {
        const index = this.#tasks.findIndex(task => task.id === id)

        if (index === -1) {
            throw Error('Trying to delete a Task that does not exist in this project.')
        }

        this.#tasks.splice(index, 1)
    }

    toJSON() {
        return {
            title: this.#title,
            tasks: this.#tasks
        }
    }

    static fromJSON(json: string) {
        return JSON.parse(json, this.#revive)
    }

    static #revive(key: string, value: unknown) {
        switch (key) {
            case '':
                const obj = value as { title: string, tasks: Task[]}
                return new Project(obj.title, obj.tasks)
            case 'tasks':
                return (value as unknown[]).map(obj => Task.fromJSON(JSON.stringify(obj)))
            default:
                return value
        }
    }
}