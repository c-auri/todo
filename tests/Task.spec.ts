import { Task } from "../src/ts/model/Task"
import { isValid } from "date-fns"

describe('Task.fromJSON', () => {
    test('deserializes id correctly', () => {
        const originalTask = new Task('ID', 'TestTask', 'TestDescription', new Date(), true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.id).toBe(originalTask.id)
    })
    test('deserializes title correctly', () => {
        const originalTitle = 'TestTask'
        const originalTask = new Task('ID', originalTitle, 'TestDescription', new Date(), true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.title).toBe(originalTitle)
    })
    test('deserializes description correctly', () => {
        const originalDescription = 'TestDescription'
        const originalTask = new Task('ID', "TestTitle", originalDescription, new Date(), true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.description).toBe(originalDescription)
    })
    test('deserializes date correctly', () => {
        const originalDate = new Date('2000-01-01T12:00:00.0Z')
        const originalTask = new Task('ID', 'TestTask', 'TestDescription', originalDate, true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.date).toEqual(originalDate)
    })
    test('deserializes hasTime correctly', () => {
        const originalTask = new Task('ID', 'TestTask', 'TestDescription', new Date(), true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.hasTime).toEqual(originalTask.hasTime)
    })
    test('deserializes invalid date correctly', () => {
        const originalTask = new Task('ID', 'TestTask', 'TestDescription', new Date(''), true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(isValid(deserializedTask.date)).toEqual(false)
    })
    test('deserializes task correctly', () => {
        const originalTask = new Task('ID', 'TestTask', 'TestDescription', new Date(), true)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask).toBeInstanceOf(Task)
        expect(deserializedTask).toEqual(originalTask)
    })
})