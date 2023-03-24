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
}