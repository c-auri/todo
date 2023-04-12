export interface Task {
    id: string
    isDone: boolean
    project: string
    title: string
    description: string
    date: Date
    hasTime: boolean
    hasHighPriority: boolean
}