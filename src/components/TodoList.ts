import './TodoList.scss'

import { Todo, renderTodo } from "./Todo"

const todoListId = 'todo-list'

export function renderTodoList(todos : Todo[] = []) {
    const main = document.querySelector('main')

    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')
    todoList.id = todoListId

    for (const todo of todos) {
        todoList.appendChild(renderTodo(todo))
    }

    main.appendChild(todoList)
}

export function appendTodoList(todo : Todo) {
    document.getElementById(todoListId).appendChild(renderTodo(todo))
}