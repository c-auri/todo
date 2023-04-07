import { isValid, formatISO } from 'date-fns'

let numberOfTasks = 0

export class Task {
    id: number
    title: string
    date: Date

    constructor(title: string, date: Date) {
        this.id = numberOfTasks++
        this.title = title
        this.date = date
    }

    get dueDate() {
        return isValid(this.date) ? formatISO(this.date, { representation: 'date' }) : ''
    }
}

export class Project {
    #title: string
    #tasks: Task[]

    constructor(title: string) {
        this.#title = title
        this.#tasks = []
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

    remove(task: Task) {
        const index = this.#tasks.indexOf(task)

        if (index === -1) {
            throw Error('Trying to delete a Task that does not exist in this project.')
        }

        this.#tasks.splice(index, 1)
    }
}