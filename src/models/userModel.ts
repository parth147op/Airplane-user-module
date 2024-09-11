import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  bookings: Array<{ flightId: string; seatId: string }>;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: [
    {
      flightId: { type: String, required: true },
      seatId: { type: String, required: true },
    },
  ],
});

export default mongoose.model<IUser>('User', UserSchema);
