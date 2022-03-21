import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
}

const UserSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", UserSchema);
