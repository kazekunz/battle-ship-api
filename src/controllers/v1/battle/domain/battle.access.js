/* eslint-disable no-return-await */
import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import battlefieldRepository from '../../../../models/battlefield.repository'
import BadRequestError from '../../../../libraries/error/bad-request-error'
import config from '../../../../config'

mongoose.set('debug', true)
const fleetConfig = config.fleet

export const placedShip = async body => {
    return await checkSpace(body)
}

const checkSpace = async body => {
    const { x, y, type, direction } = body
    const getConfig = fleetConfig[type]
    const fleets = await fleetRepository.find({ status: 'AVAILABLE', type })
    if (!fleets.data.length) throw new BadRequestError('All of this type already placed.')
    if (!getConfig) throw new BadRequestError('Wrong type.')
    const currentPositions = findCurrentPosition(x, y, direction, getConfig.length - 1)
    const aroundPositions = findAroundPosition(currentPositions, direction)

    await isOverlap(currentPositions, aroundPositions)
    await placedShipInBattleField(currentPositions, aroundPositions, direction, type)
    return {
        type,
        status: 'placed',
    }
}

const findCurrentPosition = (x, y, direction, length) => {
    let currentPosition = []
    if ((direction === 'horizontally' && x + length > 10) || (direction === 'vertically' && y - length < 0)) throw new BadRequestError('Ship placement does not allow!')
    if (direction === 'horizontally' && x + length <= 10) {
        for (let i = 0; i <= length; i++) {
            currentPosition.push({
                x: x + i,
                y,
            })
        }
    }
    if (direction === 'vertically' && y + length <= 10) {
        for (let i = 0; i <= length; i++) {
            currentPosition.push({
                x: x,
                y: y + 1,
            })
        }
    }
    console.log(x + length, direction)
    return currentPosition
}

const findAroundPosition = (positions, direction) => positions.flatMap((position, index) => {
    if (index === 0 && direction === 'horizontally') {
        return [{
            x: position.x - 1,
            y: position.y + 1,
        },
        {
            x: position.x - 1,
            y: position.y - 1,
        }, {
            x: position.x - 1,
            y: position.y,
        }, {
            x: position.x,
            y: position.y - 1,
        },
        {
            x: position.x,
            y: position.y + 1,
        },
    ]
    }
    if (index === positions.length - 1 && direction === 'horizontally') {
        return [{
            x: position.x + 1,
            y: position.y + 1,
        },
        {
            x: position.x + 1,
            y: position.y - 1,
        }, {
            x: position.x + 1,
            y: position.y,
        }, {
            x: position.x,
            y: position.y - 1,
        },
        {
            x: position.x,
            y: position.y + 1,
        },
    ]
    }
    if (direction === 'horizontally') {
        return [{
            x: position.x,
            y: position.y + 1,
        },
        {
            x: position.x,
            y: position.y - 1,
        }]
    }
    if (index === 0 && direction === 'vertically') {
        return [{
            x: position.x - 1,
            y: position.y,
        },
        {
            x: position.x + 1,
            y: position.y,
        }, {
            x: position.x,
            y: position.y + 1,
        }, {
            x: position.x - 1,
            y: position.y + 1,
        },
        {
            x: position.x + 1,
            y: position.y + 1,
        },
    ]
    }
    if (index === positions.length - 1 && direction === 'vertically') {
        return [{
            x: position.x - 1,
            y: position.y,
        },
        {
            x: position.x + 1,
            y: position.y,
        }, {
            x: position.x,
            y: position.y - 1,
        }, {
            x: position.x - 1,
            y: position.y - 1,
        },
        {
            x: position.x + 1,
            y: position.y - 1,
        },
    ]
    }
    if (direction === 'vertically') {
        return [{
            x: position.x,
            y: position.y + 1,
        },
        {
            x: position.x,
            y: position.y - 1,
        }]
    }
})

const isOverlap = async (currentPositions, aroundPositions) => {
    const checkArea = [...currentPositions, ...aroundPositions]
    const checkPositionOverlap = (await Promise.all(checkArea.map(async position => {
        const data = (await fleetRepository.find({ 'coordinate.x': position.x, 'coordinate.y': position.y })).data
        return data
    }))).filter(val => val.length > 0)
    if (checkPositionOverlap.length) throw new BadRequestError('Ship placement illegal!')
    return true
}

const placedShipInBattleField = async (currentPositions, aroundPositions, direction, type) => {
    const placedShip = await fleetRepository.update({ type, status: 'AVAILABLE' }, { status: 'ACTIVE', coordinate: currentPositions, direction, aroundCoordinate: aroundPositions })
    return placedShip
}
