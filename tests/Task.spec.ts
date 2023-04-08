import Task from "../src/ts/model/Task"
import { isValid, set } from "date-fns"

describe('Task.fromJSON', () => {
    test('deserializes id correctly', () => {
        const originalTask = new Task('TestTask', 'TestDescription', new Date(), "12:00")
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.id).toBe(originalTask.id)
    })
    test('deserializes title correctly', () => {
        const originalTitle = 'TestTask'
        const originalTask = new Task(originalTitle, 'TestDescription', new Date(), "12:00")
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.title).toBe(originalTitle)
    })
    test('deserializes description correctly', () => {
        const originalDescription = 'TestDescription'
        const originalTask = new Task("TestTitle", originalDescription, new Date(), "12:00")
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.description).toBe(originalDescription)
    })
    test('deserializes date correctly', () => {
        const originalDate = new Date('2000-01-01')
        const originalTime = '12:00'
        const expectedDate = set(originalDate, { hours: 12 })
        const originalTask = new Task('TestTask', 'TestDescription', originalDate, originalTime)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.date).toEqual(expectedDate)
    })
    test('deserializes time correctly', () => {
        const originalTime = "12:00"
        const originalTask = new Task('TestTask', 'TestDescription', new Date(), originalTime)
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask.time).toEqual(originalTime)
    })
    test('deserializes invalid date correctly', () => {
        const originalTask = new Task('TestTask', 'TestDescription', new Date(''), "12:00")
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(isValid(deserializedTask.date)).toBe(false)
    })
    test('deserializes task correctly', () => {
        const originalTask = new Task('TestTask', 'TestDescription', new Date(), "12:00")
        const deserializedTask = Task.fromJSON(JSON.stringify(originalTask))
        expect(deserializedTask).toBeInstanceOf(Task)
        expect(deserializedTask).toEqual(originalTask)
    })
})