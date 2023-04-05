import { Task, Project } from '../Models'
import { remove } from '../Controller'
import { renderNewTaskDialog } from './NewTaskDialog'
import { renderNewButton } from './NewTaskButton'

export function renderTaskList(project: Project) {
    const main = document.querySelector('main')
    main.innerHTML = ''

    const taskList = document.createElement('div')

    for (const todo of project.tasks) {
        taskList.appendChild(renderTask(todo))
    }

    const dialog = renderNewTaskDialog()

    main.appendChild(taskList)
    main.appendChild(dialog)
    main.appendChild(renderNewButton(dialog))
}

function renderTask(task : Task) {
    const taskDiv = document.createElement('div')
    taskDiv.classList.add('row', 'row-cols-3', 'gx-2', 'mb-3', 'rounded', 'border', 'border-primary')
    taskDiv.setAttribute('data-id', ""+task.id)

    taskDiv.innerHTML = `
        <span class="col">${task.title}</span>
        <span class="col">${task.dueDate}</span>
        <span class="col">
            <button class="btn btn-light">x</button>
        </span>
    `

    const deleteButton = taskDiv.querySelector('button')
    deleteButton.addEventListener('click', () => remove(task))

    return taskDiv
}