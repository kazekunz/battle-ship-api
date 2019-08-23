import { HttpMethod, route } from '@spksoft/koa-decorator'
import { resetToInitial } from './domain/game.access'

@route('/v1/game')
export default class GameController {
  @route('/', HttpMethod.GET)
  async get (ctx) {
    ctx.body = {
      battlefield: true,
      result: true,
    }
  }

  @route('/reset', HttpMethod.PUT)
  async place (ctx) {
    ctx.body = await resetToInitial()
  }
}
