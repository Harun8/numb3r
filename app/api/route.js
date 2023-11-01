import answer from "@/models/gameAnswer";
import { connectDB } from "@/utils/db";

export const POST = async (req, res) => {
  const { correctNumber, correctPlace, inputValues, timer, gameAnswer } =
    await req.json();

  try {
    await connectDB();

    const newGameAnswer = new answer({
      correctNumber,
      correctPlace,
      inputValues,
      timer,
      gameAnswer,
    });

    await newGameAnswer.save();
    return new Response(JSON.stringify(newGameAnswer));
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to create a new game answer", { status: 500 });
  }
};
