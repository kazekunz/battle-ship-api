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
    await attackerRepository.model.updateMany({}, {
        status: 'SETUP',
        attackCoordinate: [],
        attackCount: 0,
      })
      await battlefieldRepository.model.updateMany({}, {
          status: 'AVAILABLE',
          owner: null,
      })
    return {
        message: 'reset successfully',
    }
}
