let numberOfTodos = 0

export class Todo {
    id: number
    title: string
    date: Date

    constructor(title: string, date: Date) {
        this.id = numberOfTodos++
        this.title = title
        this.date = date
    }
}