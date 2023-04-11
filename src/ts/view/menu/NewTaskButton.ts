export function createNewTaskButton(): HTMLButtonElement {
    const button = document.createElement('button')

    button.classList.add('btn')
    button.classList.add('btn-success')
    button.innerHTML = 'Add&nbsp;New&nbsp;Task'
    button.type = 'button'

    const dialog = document.querySelector('#new-task-dialog') as HTMLDialogElement
    document.body.appendChild(dialog)
    button.addEventListener('click', () => dialog.showModal())

    return button
}