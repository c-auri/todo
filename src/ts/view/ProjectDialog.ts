import { pushProject } from "../Controller"

export function addProjectDialogEvents(): void {
    const dialog = document.querySelector('#project-dialog') as HTMLDialogElement
    const button = document.querySelector('#submit-project-button')
    dialog.addEventListener('close', () => submitProject(dialog.returnValue === 'add'))
    button.addEventListener('click', () => dialog.showModal())
}

function submitProject(isAdded: boolean): void {
    const projectInput = document.querySelector('#project-dialog-title') as HTMLInputElement

    if (isAdded) {
        pushProject(projectInput.value)
    }

    projectInput.value = ''
}