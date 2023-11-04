import answer from "@/models/gameAnswer";
// import round from "@/models/gameAnswer";
import { connectDB } from "@/utils/db";

export const POST = async (req, res) => {
  console.log("req body", req.body);
  const { attempts, timer, gameAnswer, gameWon } = await req.json();

  try {
    await connectDB();

    const newGameAnswer = new answer({
      Round: attempts,
      timer,
      gameAnswer,
      gameWon,
    });

    console.log("New Game Answer:", newGameAnswer);

    await newGameAnswer.save();
    return new Response(JSON.stringify(newGameAnswer));
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to create a new game answer", { status: 500 });
  }
};
