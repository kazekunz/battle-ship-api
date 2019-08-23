import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import battlefieldRepository from '../../../../models/battlefield.repository'
mongoose.set('debug', true)

export const placedShip = async body => {
    return await checkSpace(body)
}

const checkSpace = async body => {
    const { x, y, type, direction } = body
    const fleet = await fleetRepository.find({coordinate: {X, Y}, status: 'AVAILABLE'})
    return fleet
}
