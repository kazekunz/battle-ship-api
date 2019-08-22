import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import battlefieldRepository from '../../../../models/battlefield.repository'
mongoose.set('debug', true)

export const placedShip = async body => {
    const { X, Y, type } = body
    const battlefield = await battlefieldRepository.findOne({ coordinate: {X, Y} })
    return battlefield
}
