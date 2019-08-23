import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import battlefieldRepository from '../../../../models/battlefield.repository'
import attackerRepository from '../../../../models/attacker.repository'

mongoose.set('debug', true)

// eslint-disable-next-line no-return-await
export const resetToInitial = async () => {
    await fleetRepository.model.updateMany({}, {
        coordinate: [],
        aroundCoordinate: [],
        direction: 'setup',
        status: 'AVAILABLE',
    })
}
