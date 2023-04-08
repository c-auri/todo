import Task from '../model/Task'
import Project from '../model/Project'
import { remove } from '../Controller'
import { renderNewButton, renderNewTaskDialog } from './NewTask'
import TaskHtml from './Task.html'

export function renderTaskList(project: Project) {
    const main = document.querySelector('main')

    const list = renderList(project)
    const dialog = renderNewTaskDialog()
    const newButton = renderNewButton(dialog)

    main.innerHTML = ''
    main.appendChild(list)
    main.appendChild(dialog)
    main.appendChild(newButton)
}

function renderList(project: Project) {
    const ul = document.createElement('ul')
    ul.classList.add('mb-4', 'list-group', 'list-group-flush')

    if (!project.isEmpty) {
        ul.classList.add('border-top', 'border-bottom')
    }

    for (const todo of project.tasks) {
        ul.appendChild(renderItem(todo))
    }

    return ul
}

function renderItem(task : Task) {
    const li = document.createElement('li')
    li.classList.add('list-group-item')
    li.setAttribute('data-id', ""+task.id)

    li.innerHTML = TaskHtml
    li.querySelector('#task__title').textContent = task.title
    li.querySelector('#task__date').textContent = task.dateString
    li.querySelector('button').addEventListener('click', () => remove(task.id))

    return li
}