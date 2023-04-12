export interface Task {
    id: string
    project: string
    title: string
    description: string
    date: Date
    hasTime: boolean
    hasHighPriority: boolean
}