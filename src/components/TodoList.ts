export interface Todo {
    title: string
}

const todoListId = 'todo-list'

export function createTodoList(todos : Todo[] = []) {
    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')
    todoList.id = todoListId

    for (const todo of todos) {
        todoList.appendChild(render(todo))
    }

    return todoList
}

export function appendTodoList(todo : Todo) {
    document.getElementById(todoListId).appendChild(render(todo))
}

function render(todo : Todo) {
    const li = document.createElement('li')

    const container = document.createElement('article')
    container.classList.add('todo')

    const title = document.createElement('span')
    title.classList.add('todo__title')
    title.innerHTML = todo.title

    container.appendChild(title)
    li.appendChild(container)
    return li
}