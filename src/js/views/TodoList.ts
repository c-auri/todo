import { Project } from '../models/Project'
import { Todo } from '../models/Todo'
import { remove } from '../controller/TodoController'
import { renderNewTodoDialog } from './NewTodoDialog'
import { renderNewButton } from './NewTodoButton'

export function renderTodoList(project: Project) {
    const main = document.querySelector('main')
    main.innerHTML = ''

    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')
    todoList.id = 'todo-list'

    for (const todo of project.todos) {
        todoList.appendChild(renderTodo(todo))
    }

    const dialog = renderNewTodoDialog()

    main.appendChild(todoList)
    main.appendChild(dialog)
    main.appendChild(renderNewButton(dialog))
}

function renderTodo(todo : Todo) {
    const li = document.createElement('li')
    li.classList.add('todo')
    li.setAttribute('data-id', ""+todo.id)

    li.innerHTML = `
        <span class="todo__title">${todo.title}</span>
        <span class="todo__date">${todo.date.toDateString()}</span>
        <button class="button button--todo-controls">x</button>
    `

    const deleteButton = li.querySelector('button')
    deleteButton.addEventListener('click', () => remove(todo))

    return li
}