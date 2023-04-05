import { Project } from '../models/Project'
import { renderNewTodoDialog } from './NewTodoDialog'
import { renderNewButton } from './NewTodoButton'
import { renderTodo } from './Todo'

export function renderTodoList(project: Project) {
    const main = document.querySelector('main')
    main.innerHTML = ''

    const todoList = document.createElement('div')
    todoList.id = 'todo-list'

    for (const todo of project.todos) {
        todoList.appendChild(renderTodo(todo))
    }

    const dialog = renderNewTodoDialog()

    main.appendChild(todoList)
    main.appendChild(dialog)
    main.appendChild(renderNewButton(dialog))
}