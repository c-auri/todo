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
        const originalTask1 = new Task('ID', 'TestTask1', "TestDescription1", new Date(), "12:00")
        const originalTask2 = new Task('ID', 'TestTask1', "TestDescription1", new Date(), "12:00")
        const originalProject = new Project('TestProject', [ originalTask1, originalTask2 ])
        const deserializedProject = Project.fromJSON(JSON.stringify(originalProject))
        expect(deserializedProject.tasks).toEqual([ originalTask1, originalTask2 ])
    })
    test('deserializes project correctly', () => {
        const originalTasks = [ new Task('ID', 'TestTask', "TestDescription1", new Date(), "12:00") ]
        const originalProject = new Project('TestProject', originalTasks)
        const deserializedProject = Project.fromJSON(JSON.stringify(originalProject))
        expect(deserializedProject).toBeInstanceOf(Project)
        expect(deserializedProject).toEqual(originalProject)
    })
})
