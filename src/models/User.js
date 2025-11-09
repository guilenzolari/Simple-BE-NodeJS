import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    required: true,
  },
  age: Number,
  uf: {
    type: String,
    enum: ['SP', 'RJ', 'ES', 'MG'],
    required: true,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('User', UserSchema);
