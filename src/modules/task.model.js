import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', //Para decirle a que otro modelo se está referenciando, en este caso al modelo "'User'" que está creado en "./user.model.js".
    required: true //Le digo que si o si tiene que pasarme un "user".
  }
}, {
  timestamps: true
});

export default mongoose.model('Task', taskSchema)