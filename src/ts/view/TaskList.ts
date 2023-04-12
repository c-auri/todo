import { Task } from '../model/Task'
import { removeTask } from '../Controller'
import { showTaskDialog } from './TaskDialog'
import { isValid } from 'date-fns'

const list = document.querySelector('#task-list')
const template = document.querySelector('#task') as HTMLTemplateElement

export function renderTaskList(tasks: Task[]): void {
    list.innerHTML = ''

    for (const task of tasks) {
        list.appendChild(createTask(task))
    }

    if (tasks.length === 0)  {
        list.classList.add('hidden')
    } else {
        list.classList.remove('hidden')
    }
}

function createTask(task : Task): HTMLElement {
    const clone = template.content.cloneNode(true) as HTMLElement
    const item = clone.querySelector('li')

    item.setAttribute('data-id', ""+task.id)
    item.querySelector('.task-title').textContent = task.title
    item.querySelector('.task-duedate').textContent = formatDate(task)
    item.querySelector('.task-description').textContent = task.description
    item.querySelector('button[data-type="edit"]').addEventListener('click', () => showTaskDialog('update', task))
    item.querySelector('button[data-type="delete"]').addEventListener('click', () => removeTask(task.id))

    if (task.hasHighPriority) {
        item.querySelector('.task-high-priority').classList.remove('hidden')
    }

    return item
}

function formatDate(task: Task): string {
    return isValid(task.date) ? task.date.toLocaleString([], getDateOptions(task.hasTime)) : ''
}

function getDateOptions(hasTime: boolean): Intl.DateTimeFormatOptions {
    return {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: hasTime ? '2-digit' : undefined,
        minute: hasTime ? '2-digit' : undefined
    }
}