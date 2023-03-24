import './TodoInput.scss'

import { createTodo } from '../models/Todo'
import { appendTodo } from '../controller/TodoController'

export function createTodoInput() {
    const form = document.createElement('form')
    form.classList.add('todo')
    form.id = 'new-todo'
    form.appendChild(createTitleInput())
    form.appendChild(createAddButton())
    return form
}

function createTitleInput() {
    const input = document.createElement('input')
    input.type = 'text'
    input.id = 'new-todo-title'
    input.placeholder = 'title'
    return input
}

function createAddButton() {
    const button = document.createElement('button')
    button.type = 'button'
    button.id = 'new-todo-button'
    button.classList.add('todo__button')
    button.innerHTML = '+'
    button.addEventListener("click", () => addNewTodo())
    return button
}

function addNewTodo() {
    const title = document.querySelector('#new-todo-title') as HTMLInputElement
    appendTodo(createTodo(title.value))
    title.value = ''
}