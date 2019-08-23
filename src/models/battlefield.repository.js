import mongoose from 'mongoose'
import RepositoryBuilder from 'sendit-mongoose-repository'

const schemaDefinition = {
  name: String,
  status: {
    type: String,
    enum: ['AVAILABLE', 'ACTIVE'],
  },
  coordinate: {
      x: Number,
      y: Number,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Fleet' },
}

export const builder = RepositoryBuilder('Battlefield', schemaDefinition)
export default builder.Repository
