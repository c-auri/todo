export function renderNewButton(dialog: HTMLDialogElement) {
    const newButton = document.createElement('button')

    newButton.id = 'new-todo__btn'
    newButton.classList.add('btn')
    newButton.classList.add('btn-primary')
    newButton.innerHTML = 'Add New Todo'
    newButton.addEventListener('click', () => dialog.showModal())

    return newButton
}