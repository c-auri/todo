import { Todo } from './components/Todo'
import { createTodoInput } from './components/TodoInput'
import { createTodoList } from './components/TodoList'
import './styles/main.scss'


const todoList : Todo[] = []

document.querySelector('main').appendChild(createTodoList(todoList))
document.querySelector('main').append(createTodoInput())
