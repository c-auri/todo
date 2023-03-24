import { createTodoInput } from './components/TodoInput'
import { Todo, createTodoList } from './components/TodoList'
import './styles/main.scss'


const todoList : Todo[] = []

document.querySelector('main').appendChild(createTodoList(todoList))
document.querySelector('main').append(createTodoInput())
