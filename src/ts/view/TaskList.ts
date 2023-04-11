import { Task } from '../model/Task'
import { removeTask } from '../Controller'
import { showTaskDialog } from './TaskDialog'
import { isValid } from 'date-fns'

export function renderTaskList(tasks: Task[]): void {
    const ul = document.querySelector('#task-list')
    ul.innerHTML = ''

    for (const task of tasks) {
        ul.appendChild(createTask(task))
    }

    if (tasks.length === 0)  {
        ul.classList.add('hidden')
    } else {
        ul.classList.remove('hidden')
    }
}

function createTask(task : Task): HTMLElement {
    const template = document.querySelector('#task') as HTMLTemplateElement
    const clone = template.content.cloneNode(true) as HTMLElement
    const li = clone.querySelector('li')

    li.setAttribute('data-id', ""+task.id)
    li.querySelector('.task-title').textContent = task.title
    li.querySelector('.task-duedate').textContent = formatDate(task)
    li.querySelector('.task-description').textContent = task.description
    li.querySelector('button[data-type="edit"]').addEventListener('click', () => showTaskDialog('update', task))
    li.querySelector('button[data-type="delete"]').addEventListener('click', () => removeTask(task.id))

    return li
}

function formatDate(task: Task): string {
    return isValid(task.date) ? task.date.toLocaleString([], dateOptions(task.hasTime)) : ''
}

function dateOptions(hasTime: boolean): Intl.DateTimeFormatOptions {
    return {
        year: '2-digit',
        month: '2-digit',
        day: '2-digit',
        hour: hasTime ? '2-digit' : undefined,
        minute: hasTime ? '2-digit' : undefined
    }
}