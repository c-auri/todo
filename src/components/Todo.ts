export class Todo {
    title: string

    constructor(title: string) {
        this.title = title
    }

    render() {
        const todo = document.createElement('article')
        todo.classList.add('todo')

        const spanTitle = document.createElement('span')
        spanTitle.classList.add('todo__title')
        spanTitle.innerHTML = this.title
        
        todo.appendChild(spanTitle)
        return todo
    }
}