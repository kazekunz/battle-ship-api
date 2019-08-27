/* eslint-disable no-undef */
import mongoose from 'mongoose'
import { findCurrentPosition, findAroundPosition, isOverlap } from '../fleet.access'
import { MongoMemoryServer } from 'mongodb-memory-server'
import fleetRepository from '../../../../../models/fleet.repository'

let mongoServer
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000

beforeAll(async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, {}, err => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

describe('Fleet Check position', () => {
  it('Fleet current position', () => {
    const currentPosition = [{ x: 5, y: 5 }]
    expect(findCurrentPosition(5, 5, 'horizontally', 0)).toMatchObject(currentPosition)
  })

  it('Fleet around position', () => {
    const currentPosition = [{ x: 5, y: 5 }]
    const aroundPosition = [
      { x: 4, y: 6 },
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 5, y: 4 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 4 },
      { x: 6, y: 5 },
    ]
    expect(findAroundPosition(currentPosition, 'horizontally', 1)).toMatchObject(aroundPosition)
  })

  it('Should create ship', async () => {
    await fleetRepository.create({
        status: 'ACTIVE',
        direction: 'setup',
        type: 'submarines',
        length: 1,
        health: 1,
        coordinate: [],
        aroundCoordinate: [],
    })
    const cnt = await fleetRepository.model.count()
    expect(cnt).toEqual(1)
  })

  it('Should place a ship', async () => {
    const update = await fleetRepository.update({
        status: 'ACTIVE',
    }, {
        coordinate: [{
            x: 1,
            y: 1,
        }],
    })
    expect(update.coordinate.length).toEqual(1)
  })

  it('Should not overlap', async () => {
    const currentPosition = [{ x: 5, y: 5 }]
    const aroundPosition = [
      { x: 2, y: 1 },
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 5, y: 4 },
      { x: 5, y: 6 },
      { x: 6, y: 6 },
      { x: 6, y: 4 },
      { x: 6, y: 5 },
    ]
    const isNotOverlap = await isOverlap(currentPosition, aroundPosition)
    expect(isNotOverlap).toEqual(true)
  })
})
