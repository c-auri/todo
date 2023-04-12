import { serialize, deserialize } from "../src/ts/model/Serialization";

describe('Serialization', () => {
    test('preserves Tasks', () => {
        const done = {
            id: 'ID0',
            isDone: true,
            project: 'TestProject0',
            title: 'TestTitle0', 
            description: 'TestDescription0', 
            date: new Date(), 
            hasTime: true,
            hasHighPriority: true
        }

        const highPriority = {
            id: 'ID1',
            isDone: false,
            project: 'TestProject1',
            title: 'TestTitle1', 
            description: 'TestDescription1', 
            date: new Date(), 
            hasTime: true,
            hasHighPriority: true
        }

        const withTime = {
            id: 'ID2',
            isDone: false,
            project: 'TestProject2',
            title: 'TestTitle2', 
            description: 'TestDescription2', 
            date: new Date(), 
            hasTime: true,
            hasHighPriority: false
        }

        const noTime = {
            id: 'ID3',
            isDone: false,
            project: 'TestProject3',
            title: 'TestTitle3',
            description: 'TestDescription3',
            date: new Date(),
            hasTime: false,
            hasHighPriority: false
        }

        const noDate = {
            id: 'ID4',
            isDone: false,
            project: 'TestProject4',
            title: 'TestTitle4',
            description: 'TestDescription4',
            date: new Date(''),
            hasTime: false,
            hasHighPriority: false
        }

        const tasks = [ done, highPriority, withTime, noTime, noDate ]

        expect(JSON.stringify(deserialize(serialize(tasks)))).toMatch(JSON.stringify(tasks))
    })
})