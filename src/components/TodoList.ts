import { Todo, createTodo } from "./Todo"

const todoListId = 'todo-list'

export function createTodoList(todos : Todo[] = []) {
    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')
    todoList.id = todoListId

    for (const todo of todos) {
        todoList.appendChild(createTodo(todo))
    }

    return todoList
}

export function appendTodoList(todo : Todo) {
    document.getElementById(todoListId).appendChild(createTodo(todo))
}