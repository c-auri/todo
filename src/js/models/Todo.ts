import { isValid, formatISO } from 'date-fns'

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

    get dueDate() {
        return isValid(this.date) ? formatISO(this.date, { representation: 'date' }) : ''
    }
}