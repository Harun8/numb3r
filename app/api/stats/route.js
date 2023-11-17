import answer from "@/models/gameAnswer";

import { connectDB } from "@/utils/db";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const totalGames = await answer.countDocuments();
    const gameWon = await answer.countDocuments({ gameWon: true });
    const gameLost = totalGames - gameWon;
    const response = [
      {
        totalGames: totalGames,
      },
      {
        gameWon: gameWon,
      },
      {
        gameLost: gameLost,
      },
    ];

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Get req failed", { status: 500 });
  }
};
