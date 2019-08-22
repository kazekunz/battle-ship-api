import RepositoryBuilder from 'sendit-mongoose-repository'

const schemaDefinition = {
  team: {
    type: String,
    enum: ['ATTACKER', 'DEFENDER'],
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'ACTIVE'],
  },
  direction: {
    type: String,
    enum: ['VERTICAL', 'HORIZONTAL'],
  },
  type: String,
  length: Number,
  coordinate: {
      X: Number,
      Y: Number,
  },
}

export const builder = RepositoryBuilder('Fleet', schemaDefinition)
export default builder.Repository
