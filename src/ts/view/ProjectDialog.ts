import { pushProject } from "../Controller"

export function addProjectDialogEvents(): void {
    const dialog = document.querySelector('#project-dialog') as HTMLDialogElement
    const openButton = document.querySelector('#submit-project-button')
    const cancelButton = document.querySelector('#project-dialog-cancel-button')
    const form = document.querySelector('#project-dialog-form') as HTMLFormElement

    openButton.addEventListener('click', showProjectDialog)
    cancelButton.addEventListener('click', () => dialog.close())
    form.addEventListener('submit', submitProject)
}

function showProjectDialog() {
    const dialog = document.querySelector('#project-dialog') as HTMLDialogElement
    const projectInput = document.querySelector('#project-dialog-title') as HTMLInputElement
    projectInput.value = ''
    dialog.showModal()
}

function submitProject(event: Event): void {
    const form = event.target as HTMLFormElement

    if (!form.checkValidity()) {
        event.preventDefault()
        form.classList.add('was-validated')
        return
    }

    const projectTitle = document.querySelector('#project-dialog-title') as HTMLInputElement
    pushProject(projectTitle.value)
}