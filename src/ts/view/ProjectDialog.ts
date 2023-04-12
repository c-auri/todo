import { pushProject } from "../Controller"

const dialog = document.querySelector('#project-dialog') as HTMLDialogElement
const openButton = document.querySelector('#submit-project-button')
const cancelButton = document.querySelector('#project-dialog-cancel-button')
const form = document.querySelector('#project-dialog-form') as HTMLFormElement

const projectTitle = document.querySelector('#project-dialog-title') as HTMLInputElement

export function addProjectDialogEvents(): void {
    openButton.addEventListener('click', showProjectDialog)
    cancelButton.addEventListener('click', () => dialog.close())
    form.addEventListener('submit', submitProject)
}

function showProjectDialog() {
    form.classList.remove('was-validated')
    projectTitle.value = ''
    dialog.showModal()
}

function submitProject(event: Event): void {
    if (!form.checkValidity()) {
        event.preventDefault()
        form.classList.add('was-validated')
        return
    }

    pushProject(projectTitle.value)
}