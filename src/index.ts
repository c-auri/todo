import { Todo } from './components/Todo'
import './styles.scss'

const todoList = document.querySelector('#todo-list')

const todos = [
    new Todo('Add styles'),
    new Todo('Add add button'),
    new Todo('Add delete button'),
]

todos.forEach(todo => todoList.appendChild(todo.render()))