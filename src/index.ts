import { Project } from './models/Project'
import { renderTodoList } from './components/TodoList'
import './styles/main.scss'


const inbox = new Project('Inbox')

renderTodoList(inbox)