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

    toJSON() {
        return { 
            id: this.id, 
            title: this.title, 
            date: this.date 
        }
    }
}