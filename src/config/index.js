import 'dotenv/config' // Only on top
import database from './database'
import example from './example'
import system from './system'
import fleet from './fleet'
const combineConfig = {
  database,
  example,
  system,
  fleet,
}
export default combineConfig
