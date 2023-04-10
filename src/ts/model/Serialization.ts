import { Task } from './Task'
import { parseJSON } from 'date-fns'

export function serialize(tasks: Task[]) {
    return JSON.stringify(tasks, replace)
}

export function deserialize(json: string) {
    return JSON.parse(json, revive) as Task[]
}

function replace(key: string, value: unknown) {
    if (value instanceof Date) {
        return value.toJSON()
    }

    return value
}

function revive(key: string, value: unknown) {
    switch (key) {
        case '':
            return (value as unknown[]).map(obj => obj as Task)
        case 'date':
            return parseJSON(value as string)
        default:
            return value
    }
}