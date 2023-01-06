import mongoose from "mongoose";

interface User {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model<User>("User", userSchema);
