import Project from "../src/ts/model/Project"
import Task from "../src/ts/model/Task"

describe('Project.fromJSON', () => {
    test('deserializes title correctly', () => {
        const originalTitle = 'TestProject'
        const originalProject = new Project(originalTitle, [])
        const deserializedProject = Project.fromJSON(JSON.stringify(originalProject))
        expect(deserializedProject.title).toBe(originalTitle)
    })
    test('deserializes tasks correctly', () => {
        const originalTask1 = new Task('TestTask1', new Date())
        const originalTask2 = new Task('TestTask1', new Date())
        const originalProject = new Project('TestProject', [ originalTask1, originalTask2 ])
        const deserializedProject = Project.fromJSON(JSON.stringify(originalProject))
        expect(deserializedProject.tasks).toEqual([ originalTask1, originalTask2 ])
    })
    test('deserializes project correctly', () => {
        const originalProject = new Project('TestProject', [ new Task('TestTask', new Date()) ])
        const deserializedProject = Project.fromJSON(JSON.stringify(originalProject))
        expect(deserializedProject).toBeInstanceOf(Project)
        expect(deserializedProject).toEqual(originalProject)
    })
})
