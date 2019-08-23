import { HttpMethod, route } from '@spksoft/koa-decorator'
import { createShip } from './domain/fleet.access'

@route('/v1/fleet')
export default class HelloWorldController {
  @route('/', HttpMethod.GET)
  async get (ctx) {
    ctx.body = {
      battlefield: true,
      result: true,
    }
  }

  @route('/', HttpMethod.POST)
  async place (ctx) {
    const { body } = ctx.request
    ctx.body = await createShip(body)
  }
}
