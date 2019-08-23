import RepositoryBuilder from 'sendit-mongoose-repository'

const schemaDefinition = {
  status: {
    type: String,
    enum: ['SETUP', 'PLAYING'],
  },
  attackCoordinate: [{
    x: Number,
    y: Number,
  }],
  attackCount: Number,
}

export const builder = RepositoryBuilder('Game', schemaDefinition)
export default builder.Repository
