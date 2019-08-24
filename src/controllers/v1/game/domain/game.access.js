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
        miss: 0,
        hit: 0,
        limit: 35,
      })
      await battlefieldRepository.model.updateMany({}, {
          status: 'AVAILABLE',
          owner: null,
      })
    return {
        message: 'reset successfully',
    }
}

export const getCurrentState = async () => {
    const attacker = await attackerRepository.findOne({})
    const battlefield = await battlefieldRepository.find({}, { populate: ['owner'] })
    const fleets = await fleetRepository.find({})
    return {
        gameState: {
            status: attacker.status,
            attackRequired: attacker.limit,
            attackCount: attacker.attackCount,
            hit: attacker.hit,
            miss: attacker.miss,
        },
        fleets: {
            available: {
                count: fleets.data.filter(fleet => fleet.status === 'AVAILABLE').length,
                data: fleets.data.filter(fleet => fleet.status === 'AVAILABLE').map(fleet => {
                    return {
                        type: fleet.type,
                        coordinate: fleet.coordinate,
                        health: fleet.health,
                    }
                }),
            },
            active: {
                count: fleets.data.filter(fleet => fleet.status === 'ACTIVE').length,
                data: fleets.data.filter(fleet => fleet.status === 'ACTIVE').map(fleet => {
                    return {
                        type: fleet.type,
                        coordinate: fleet.coordinate,
                        health: fleet.health,
                    }
                }),
            },
        },
        ocean: {
            available: {
                count: battlefield.data.filter(ocean => ocean.status === 'AVAILABLE').length,
                data: battlefield.data.filter(ocean => ocean.status === 'AVAILABLE').map(ocean => ocean.coordinate),
            },
            active: {
                count: battlefield.data.filter(ocean => ocean.status === 'ACTIVE').length,
                data: battlefield.data.filter(ocean => ocean.status === 'ACTIVE').map(ocean => {
                    return {
                        coordinate: ocean.coordinate,
                        owner: ocean.owner && ocean.owner.type,
                    }
                }),
            },
        },
    }
}
