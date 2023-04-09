import TaskHtml from './Task.html'
import { Project } from '../model/Project'
import { Task } from '../model/Task'
import { remove } from '../Controller'
import { renderNewButton, renderNewTaskDialog } from './NewTask'
import { isValid } from 'date-fns'

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
    li.querySelector('#task__duedate').textContent = printDate(task)
    li.querySelector('#task__description').textContent = task.description
    li.querySelector('button').addEventListener('click', () => remove(task.id))

    return li
}

function printDate(task: Task) {
    return isValid(task.date) ? task.date.toLocaleString([], dateOptions(task.time)) : ''
}

function dateOptions(time: string): Intl.DateTimeFormatOptions {
    return {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: time ? '2-digit' : undefined,
        minute: time ? '2-digit' : undefined
    }
}