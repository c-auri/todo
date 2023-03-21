import { Todo } from './components/Todo'
import './styles/main.scss'

document.querySelector('#new-todo-button').addEventListener("click", addNewTodo)

function addNewTodo() {
    const todoList = document.querySelector('#todo-list')
    const title = document.querySelector('#new-todo-title') as HTMLInputElement
    const newTodo = new Todo(title.value)
    todoList.appendChild(newTodo.render())
}