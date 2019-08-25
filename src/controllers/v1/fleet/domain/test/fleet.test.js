/* eslint-disable no-undef */
import { findCurrentPosition, findAroundPosition, isOverlap } from '../fleet.access'

describe('Fleet', () => {
    it('Fleet current position', () => {
        const currentPosition = [{x: 5, y: 5}]
        expect(findCurrentPosition(5, 5, 'horizontally', 0)).toMatchObject(currentPosition)
    })

    it('Fleet around position', () => {
        const currentPosition = [{x: 5, y: 5}]
        const aroundPosition = [ { x: 4, y: 6 },
            { x: 4, y: 4 },
            { x: 4, y: 5 },
            { x: 5, y: 4 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
            { x: 6, y: 4 },
            { x: 6, y: 5 } ]
        expect(findAroundPosition(currentPosition, 'horizontally', 1)).toMatchObject(aroundPosition)
    })

//     it('Fleet ship not overlap', async () => {
//     const currentPosition = [{x: 5, y: 5}]
//     const aroundPosition = [ { x: 4, y: 6 },
//         { x: 4, y: 4 },
//         { x: 4, y: 5 },
//         { x: 5, y: 4 },
//         { x: 5, y: 6 },
//         { x: 6, y: 6 },
//         { x: 6, y: 4 },
//         { x: 6, y: 5 } ]
//     const data = await isOverlap(currentPosition, aroundPosition)
//     expect(data).toEqual(true)
// })
})
