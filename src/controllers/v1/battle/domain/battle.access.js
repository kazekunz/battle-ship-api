/* eslint-disable no-return-await */
import mongoose from 'mongoose'
import fleetRepository from '../../../../models/fleet.repository'
import battlefieldRepository from '../../../../models/battlefield.repository'
import BadRequestError from '../../../../libraries/error/bad-request-error'
import config from '../../../../config'

mongoose.set('debug', true)
