import answer from "@/models/gameAnswer";
// import round from "@/models/gameAnswer";
import { connectDB } from "@/utils/db";

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {
  try {
    await connectDB();
    const response = await answer.find({}).sort({ timer: 1 }); // -1 = desc, 1 = asec

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log("error", error);

    return new Response("Failed to get game stats", { status: 500 });
  }
};

export const POST = async (req, res) => {
  console.log("req body", req.body);
  const { attempts, timer, gameAnswer, gameWon, name } = await req.json();

  try {
    await connectDB();

    const newGameAnswer = new answer({
      Round: attempts,
      timer,
      gameAnswer,
      gameWon,
      name,
    });

    console.log("New Game Answer:", newGameAnswer);

    await newGameAnswer.save();
    return new Response(JSON.stringify(newGameAnswer));
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to create a new game answer", { status: 500 });
  }
};
