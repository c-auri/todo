import './TodoList.scss'

import { Project } from '../models/Project'
import { Todo } from '../models/Todo'

import { removeTodo } from '../controller/TodoController'

import { createTodoInput } from './TodoInput'

const todoListId = 'todo-list'

export function renderTodoList(project: Project) {
    const main = document.querySelector('main')
    main.innerHTML = ''

    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')
    todoList.id = todoListId

    for (const todo of project.todos) {
        todoList.appendChild(renderTodo(todo))
    }

    main.appendChild(todoList)
    main.appendChild(createTodoInput())
}

function renderTodo(todo : Todo) {
    const li = document.createElement('li')
    li.classList.add('todo')
    li.setAttribute('data-id', ""+todo.id)

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('todo__button')
    deleteButton.innerHTML = "x"
    deleteButton.addEventListener('click', () => removeTodo(todo))

    li.appendChild(title)
    li.appendChild(deleteButton)
    return li
}