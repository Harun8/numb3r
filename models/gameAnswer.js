import mongoose, { Schema, model, models } from "mongoose";

const gameAnswerSchema = new Schema({
  correctNumber: {
    type: Array,
    required: [true, "Correct number is required"],
  },

  correctPlace: {
    type: Array,
    required: [true, "Correct place is required"],
  },

  inputValues: {
    type: Array,
    required: [true, "Input values is required"],
  },
  timer: {
    type: String,
    // required: [true, "Time is required"],
  },

  gameAnswer: {
    type: Array,
    requied: [true, "Game answer is required"],
  },
});

const answer = models.answer || model("answer", gameAnswerSchema);
export default answer;
