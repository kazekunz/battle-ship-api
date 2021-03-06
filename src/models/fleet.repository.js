import RepositoryBuilder from 'sendit-mongoose-repository'

const schemaDefinition = {
  status: {
    type: String,
    enum: ['AVAILABLE', 'ACTIVE'],
  },
  direction: {
    type: String,
    enum: ['vertically', 'horizontally', 'setup'],
  },
  type: String,
  length: Number,
  coordinate: [{
      x: Number,
      y: Number,
  }],
  aroundCoordinate: [{
    x: Number,
    y: Number,
}],
  health: Number,
}

export const builder = RepositoryBuilder('Fleet', schemaDefinition)
export default builder.Repository
