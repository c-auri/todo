import './TodoList.scss'

import { Project } from '../models/Project'
import { Todo } from '../models/Todo'

import { createTodoInput } from './TodoInput'

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
    main.appendChild(createTodoInput())
}

export function appendTodoList(todo : Todo) {
    document.getElementById(todoListId).appendChild(renderTodo(todo, deleteTodo))
}

function renderTodo(todo : Todo, deleteTodo : (todo: Element) => void) {
    const li = document.createElement('li')
    li.classList.add('todo')
    li.setAttribute('data-id', ""+todo.id)

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    const deleteButton = document.createElement('button')
    deleteButton.classList.add('todo__button')
    deleteButton.innerHTML = "x"
    deleteButton.addEventListener('click', () => deleteTodo(li))

    li.appendChild(title)
    li.appendChild(deleteButton)
    return li
}

function deleteTodo(li : Element) {
    document.getElementById(todoListId).removeChild(li)
}