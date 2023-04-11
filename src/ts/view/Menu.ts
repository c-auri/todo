import { addProjectDialogEvents } from "./ProjectDialog"
import { addNewTaskDialogEvents } from "./TaskDialog"

export function initializeMenu() {
    addProjectDialogEvents()
    addNewTaskDialogEvents()
}