import { HttpMethod, route } from '@spksoft/koa-decorator'
import { getBattlefield, createBattlefield } from './domain/battlefield.access'

@route('/v1/battlefield')
export default class HelloWorldController {
  @route('/', HttpMethod.GET)
  async get (ctx) {
    ctx.body = {
      battlefield: true,
      result: await getBattlefield(),
    }
  }

  @route('/', HttpMethod.POST)
  async create (ctx) {
    ctx.body = {
      result: await createBattlefield(),
    }
  }
}
