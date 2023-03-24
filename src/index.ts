import { Todo, createTodoList } from './components/TodoList'
import './styles/main.scss'


const todoList : Todo[] = []

document.querySelector('#new-todo-button').addEventListener("click", addNewTodo)

function addNewTodo() {
    const title = document.querySelector('#new-todo-title') as HTMLInputElement
    todoList.push({ title: title.value })
    const container = document.querySelector('#todo-list-container')
    container.innerHTML = ''
    container.appendChild(createTodoList(todoList))
    title.value = ''
}