import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'

mongoose.set('debug', true)

// eslint-disable-next-line no-return-await
export const createShip = async body => await fleetRepository.create(body)
