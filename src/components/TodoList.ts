import './TodoList.scss'

import { Project } from '../models/Project'
import { Todo } from '../models/Todo'
import { renderTodo } from "./Todo"

const todoListId = 'todo-list'

export function renderTodoList(project : Project) {
    const main = document.querySelector('main')

    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')
    todoList.id = todoListId

    for (const todo of project.todos) {
        todoList.appendChild(renderTodo(todo, deleteTodo))
    }

    main.appendChild(todoList)
}

export function appendTodoList(todo : Todo) {
    document.getElementById(todoListId).appendChild(renderTodo(todo, deleteTodo))
}

function deleteTodo(li : Element) {
    document.getElementById(todoListId).removeChild(li)
}