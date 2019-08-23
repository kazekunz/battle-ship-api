import { HttpMethod, route } from '@spksoft/koa-decorator'
import { createShip, placedShip } from './domain/fleet.access'

@route('/v1/fleet')
export default class FleetController {
  @route('/', HttpMethod.GET)
  async get (ctx) {
    ctx.body = {
      battlefield: true,
      result: true,
    }
  }

  @route('/', HttpMethod.POST)
  async create (ctx) {
    const { body } = ctx.request
    ctx.body = await createShip(body)
  }

  @route('/place', HttpMethod.PUT)
  async place (ctx) {
    const { body } = ctx.request
    ctx.body = await placedShip(body)
  }
}
