import mongoose, { Schema, model, models } from "mongoose";
const roundSchema = new Schema({
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
});

const gameAnswerSchema = new Schema({
  Round: [roundSchema],
  timer: {
    type: Number,
    // required: [true, "Time is required"],
  },
  gameAnswer: {
    type: Array,
    requied: [true, "Game answer is required"],
  },

  gameWon: {
    type: Boolean,
    required: [true, "Game status is required"],
  },

  name: {
    type: String,
    required: false,
  },
});

const answer = models.answer || model("answer", gameAnswerSchema);
const round = models.round || model("round", roundSchema);

export default answer;
