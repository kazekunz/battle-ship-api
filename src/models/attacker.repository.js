import RepositoryBuilder from 'sendit-mongoose-repository'

const schemaDefinition = {
  status: {
    type: String,
    enum: ['SETUP', 'PLAYING'],
    default: 'SETUP',
  },
  attackCoordinate: [{
    x: Number,
    y: Number,
  }],
  attackCount: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 35,
  },
  miss: {
    type: Number,
    default: 0,
  },
  hit: {
    type: Number,
    default: 0,
  },
}

export const builder = RepositoryBuilder('Attacker', schemaDefinition)
export default builder.Repository
