import { HttpMethod, route } from '@spksoft/koa-decorator'
import { attack } from './domain/battle.access'

@route('/v1/battle')
export default class BattleController {
  @route('/', HttpMethod.GET)
  async get (ctx) {
    ctx.body = {
      battlefield: true,
      result: true,
    }
  }

  @route('/attack', HttpMethod.POST)
  async attack (ctx) {
    const { x, y } = ctx.request.body
    ctx.body = await attack({x, y})
  }
}
