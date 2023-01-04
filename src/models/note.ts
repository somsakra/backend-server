import mongoose from "mongoose";

interface Note {
  title: string;
  content: string;
  isDone: boolean;
  userId: mongoose.Schema.Types.ObjectId;
}

const noteSchema = new mongoose.Schema<Note>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Note", noteSchema);
