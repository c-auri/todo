import { Task, Project } from '../Models'
import { remove } from '../Controller'
import { renderNewButton, renderNewTaskDialog } from './NewTask'
import { isValid, formatISO } from 'date-fns'

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
    ul.classList.add('mb-3', 'list-group', 'list-group-flush')

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

    li.innerHTML = `
        <span class="col">${task.title}</span>
        <span class="col">${renderDate(task.date)}</span>
        <span class="col">
            <button class="btn btn-light">x</button>
        </span>
    `

    const deleteButton = li.querySelector('button')
    deleteButton.addEventListener('click', () => remove(task.id))

    return li
}

function renderDate(date: Date) {
    return isValid(date) ? formatISO(date) : ""
}