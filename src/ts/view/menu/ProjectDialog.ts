import { appendProject } from "../../Controller"

export function addProjectDialogEvent(): void {
    const dialog = document.querySelector('#new-project-dialog') as HTMLDialogElement
    dialog.addEventListener('close', () => submitProject(dialog.returnValue === 'add'))
}

function submitProject(isAdded: boolean): void {
    const titleInput = document.querySelector('#new-project-title') as HTMLInputElement

    if (isAdded) {
        appendProject(titleInput.value)
    }

    titleInput.value = ''
}