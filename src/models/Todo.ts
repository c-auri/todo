let numberOfTodos = 0

export interface Todo {
    id: number
    title: string
}

export function createTodo(title : string) {
    return {
        id: numberOfTodos++,
        title: title
    }
}