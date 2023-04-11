import { addProjectDialogEvents } from "./ProjectDialog"
import { addTaskDialogEvents } from "./TaskDialog"

export function initializeMenu() {
    addProjectDialogEvents()
    addTaskDialogEvents()
}