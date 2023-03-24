import { Todo } from './components/Todo'
import { renderTodoInput } from './components/TodoInput'
import { renderTodoList } from './components/TodoList'
import './styles/main.scss'


const todoList : Todo[] = []

renderTodoList(todoList)
renderTodoInput()
