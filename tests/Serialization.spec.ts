import { serialize, deserialize } from "../src/ts/model/Serialization";

describe('Serialization', () => {
    test('preserves Tasks', () => {
        const withTime = {
            id: 'ID1', 
            title: 'TestTitle', 
            description: 'TestDescription', 
            date: new Date(), 
            hasTime: true
        }

        const noTime = {
            id: 'ID2',
            title: 'TestTitle',
            description: 'TestDescription',
            date: new Date(),
            hasTime: false
        }

        const noDate = {
            id: 'ID2',
            title: 'TestTitle',
            description: 'TestDescription',
            date: new Date(''),
            hasTime: false
        }

        const tasks = [ withTime, noTime, noDate ]

        expect(JSON.stringify(deserialize(serialize(tasks)))).toMatch(JSON.stringify(tasks))
    })
})