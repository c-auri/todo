let numberOfTasks = 0

export class Task {
    id: number
    title: string
    date: Date

    constructor(title: string, date: Date, id: number = undefined) {
        this.id = typeof id === 'undefined' ? ++numberOfTasks : id
        this.title = title
        this.date = date
    }

    toJSON() {
        return { 
            id: this.id, 
            title: this.title, 
            date: this.date 
        }
    }
}

export class Project {
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
        const plainProject = JSON.parse(json)
        const plainTasks = plainProject.tasks as Task[]
        const tasks = Array.from(plainTasks, task => new Task(task.title, task.date, task.id))
        return new Project(plainProject.title, tasks)
    }
}