/* eslint-disable no-return-await */
import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import attackerRepository from '../../../../models/attacker.repository'
import { BadRequestError, UnauthorizedError } from '../../../../libraries/error/'

mongoose.set('debug', true)

export const attack = async({x, y}) => {
    await isPlacedAllShip()
    const checkGameOver = await isGameOver()
    if (checkGameOver) {
        return checkGameOver
    }
    await isAttacked({x, y})
    return await attackShip({x, y})
}

const isPlacedAllShip = async () => {
    const fleets = await fleetRepository.find({status: 'AVAILABLE'})
    if (fleets.data.length > 0) throw new UnauthorizedError('Needs to place all ships before start attacking')
}

const attackShip = async ({x, y}) => {
    let health, message
    let { attackCount, miss, hit, limit } = await attackerRepository.findOne({})
    const fleet = await fleetRepository.findOne({ 'coordinate.x': x, 'coordinate.y': y })
    fleet && fleet.toObject()
    if (fleet) {
        health = fleet.health - 1
        hit += 1
        await fleetRepository.update({ _id: fleet._id }, { health })
        await attackerRepository.update({}, { $push: { attackCoordinate: { x, y } }, status: 'ACTIVE', $inc: { attackCount: 1, hit: 1 } })
        message = health === 0 ? `You just sank the ${fleet.type}` : 'HIT!'
    } else {
        miss += 1
        message = 'MISS!'
        await attackerRepository.update({}, { $push: { attackCoordinate: { x, y } }, status: 'ACTIVE', $inc: { attackCount: 1, miss: 1 } })
    }
    return {
        message,
        hit,
        missedShots: miss,
        attackCount: hit + miss,
        numberOfRequiredShots: limit,
    }
}

const isAttacked = async({x, y}) => {
    if (await attackerRepository.findOne({ 'attackCoordinate.x': x, 'attackCoordinate.y': y })) {
        throw new BadRequestError('This coordidate was attacked')
    }
    return true
}

const isGameOver = async () => {
    const { attackCount, miss, hit, limit } = await attackerRepository.findOne({})
    if (attackCount >= limit) {
        return {
            message: 'GAME OVER',
            hit,
            missedShots: miss,
            attackCount,
            numberOfRequiredShots: limit,
        }
    }
}