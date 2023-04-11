import { pushProject } from "../Controller"

export function addProjectDialogEvents(): void {
    const dialog = document.querySelector('#new-project-dialog') as HTMLDialogElement
    const button = document.querySelector('#new-project-button')
    dialog.addEventListener('close', () => submitProject(dialog.returnValue === 'add'))
    button.addEventListener('click', () => dialog.showModal())
}

function submitProject(isAdded: boolean): void {
    const titleInput = document.querySelector('#new-project-title') as HTMLInputElement

    if (isAdded) {
        pushProject(titleInput.value)
    }

    titleInput.value = ''
}