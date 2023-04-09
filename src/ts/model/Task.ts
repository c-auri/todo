import { isValid, parseJSON, set } from 'date-fns'

interface TaskData {
    id: string
    title: string
    description: string
    date: Date
    time: string
}

export default class Task {
    id: string
    title: string
    description: string
    date: Date
    time: string

    constructor(
            id: string,
            title: string,
            description: string,
            date: Date,
            time: string) {
        this.id = id
        this.title = title
        this.description = description

        if (time) {
            const [ hours, minutes ] = time.split(':').map(token => +token)
            this.date = set(date, { hours, minutes })
        } else {
            this.date = date
        }

        this.time = time
    }

    get dueDateString() {
        return isValid(this.date) ? this.date.toLocaleString([], this.#dateOptions) : ''
    }

    get #dateOptions(): Intl.DateTimeFormatOptions {
        return {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: this.time ? '2-digit' : undefined,
            minute: this.time ? '2-digit' : undefined
        }
    }

    toJSON() {
        return { 
            id: this.id,
            title: this.title,
            description: this.description,
            date: this.date.toJSON(),
            time: this.time
        }
    }

    static fromData(data: TaskData) {
        return new Task(data.id, data.title, data.description, data.date, data.time)
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