/* eslint-disable no-return-await */
import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import battlefieldRepository from '../../../../models/battlefield.repository'
import attackerRepository from '../../../../models/attacker.repository'
import { BadRequestError, UnauthorizedError } from '../../../../libraries/error/'
import config from '../../../../config'

mongoose.set('debug', true)

export const attack = async({x, y}) => {
    await isPlacedAllShip()
    await attackShip()
    return true
}

const isPlacedAllShip = async () => {
    const fleets = await fleetRepository.find({status: 'AVAILABLE'})
    if (fleets.data.length > 0) throw new UnauthorizedError('Needs to place all ships before start attacking')
}

const attackShip = async ({x, y}) => {
    const fleet = await fleetRepository.findOne({ 'coordinate.x': x, 'coordinate.y': y })
    fleet.toObject()
    if (fleet) {
        await fleetRepository.update({ _id: fleet._id }, { health: fleet.health - 1 })
        await attackerRepository.update({}, { $push: { attackCoordinate: { x, y } } })
    }
}