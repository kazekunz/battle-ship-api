import { HttpMethod, route } from '@spksoft/koa-decorator'
import { placedShip } from './domain/battle.access'

@route('/v1/battle')
export default class BattleController {
  @route('/', HttpMethod.GET)
  async get (ctx) {
    ctx.body = {
      battlefield: true,
      result: true,
    }
  }

  @route('/place', HttpMethod.PUT)
  async place (ctx) {
    const { body } = ctx.request
    ctx.body = await placedShip(body)
  }
}
