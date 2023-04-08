import { isValid, formatISO, parseJSON } from 'date-fns'

let numberOfTasks = 0

export default class Task {
    id: number
    title: string
    date: Date

    constructor(title: string, date: Date, id: number = undefined) {
        this.id = typeof id === 'undefined' ? ++numberOfTasks : id
        this.title = title
        this.date = date
    }

    get dateString() {
        return isValid(this.date) ? formatISO(this.date, { representation: 'date' }) : ''
    }

    toJSON() {
        return { 
            id: this.id, 
            title: this.title, 
            date: this.date.toJSON()
        }
    }

    static fromJSON(json: string) {
        return JSON.parse(json, this.#revive)
    }

    static #revive(key: string, value: unknown) {
        switch (key) {
            case '':
                const obj = value as { id: number, title: string, date: Date }
                return new Task(obj.title, obj.date, obj.id)
            case 'date':
                return parseJSON(value as string)
            default:
                return value
        }
    }
}