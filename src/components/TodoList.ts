export interface Todo {
    title: string
}

export function createTodoList(todos : Todo[] = []) {
    const todoList = document.createElement('ul')
    todoList.classList.toggle('todo-list')

    for (const todo of todos) {
        todoList.appendChild(render(todo))
    }

    return todoList
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