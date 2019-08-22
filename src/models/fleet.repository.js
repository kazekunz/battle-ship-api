import RepositoryBuilder from 'sendit-mongoose-repository'

const schemaDefinition = {
  team: {
    type: String,
    enum: ['ATTACKER', 'DEFENDER'],
  },
  model: String,
  length: Number,
  coordinate: {
      X: String,
      Y: String,
  },
}

export const builder = RepositoryBuilder('Fleet', schemaDefinition)
export default builder.Repository
