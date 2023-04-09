import { parseJSON } from 'date-fns'

interface TaskData {
    id: string
    title: string
    description: string
    date: Date
    hasTime: boolean
}

export class Task {
    id: string
    title: string
    description: string
    date: Date
    hasTime: boolean

    constructor(
            id: string,
            title: string,
            description: string,
            date: Date,
            hasTime: boolean) {
        this.id = id
        this.title = title
        this.description = description
        this.date = date
        this.hasTime = hasTime
    }

    toJSON() {
        return { 
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date.toJSON(),
            hasTime: this.hasTime
        }
    }

    static fromData(data: TaskData) {
        return new Task(data.id, data.title, data.description, data.date, data.hasTime)
    }

    static fromJSON(json: string) {
        return JSON.parse(json, this.#revive)
    }

    static #revive(key: string, value: unknown) {
        switch (key) {
            case '':
                return Task.fromData(value as TaskData)
            case 'date':
                return parseJSON(value as string)
            default:
                return value
        }
    }
}