let numberOfTodos = 0

export interface Todo {
    id: number
    title: string
    date: Date
}

export function createTodo(title : string, date: Date) {
    return {
        id: numberOfTodos++,
        title: title,
        date: date
    }
}