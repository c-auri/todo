import { Todo } from './Todo'

export class Project {
    #title: string
    #todos: Todo[]

    constructor(title: string) {
        this.#title = title
        this.#todos = []
    }

    get title() {
        return this.#title
    }

    get todos() {
        return this.#todos
    }

    add(todo: Todo) {
        this.#todos.push(todo)
    }

    remove(todo: Todo) {
        const index = this.#todos.indexOf(todo)

        if (index === -1) {
            throw Error('Trying to delete a Todo that does not exist in this project.')
        }

        this.#todos.splice(index, 1)
    }
}