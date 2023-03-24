import { Todo } from '../models/Todo'
import { Project } from '../models/Project'
import { renderTodoList } from '../components/TodoList'

let currentProject : Project

export function initialize() {
    currentProject = new Project("Inbox")
    renderTodoList(currentProject)
}

/**
 * Appends Todo to the current project.
 * @param todo The Todo to append.
 */
export function appendTodo(todo: Todo) {
    currentProject.add(todo)
    renderTodoList(currentProject)
}

/**
 * Removes Todo from the current project.
 * @param todo The Todo to remove.
 */
export function removeTodo(todo: Todo) {
    currentProject.remove(todo)
    renderTodoList(currentProject)
}