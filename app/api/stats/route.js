import answer from "@/models/gameAnswer";

import { connectDB } from "@/utils/db";

export const dynamic = "force-dynamic"; // vercel Bullshit static rendeirng
// https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no
// simulate change
export const GET = async (req, res) => {
  try {
    await connectDB();
    const totalGames = await answer.countDocuments();
    const gameWon = await answer.countDocuments({ gameWon: true });
    const gameLost = totalGames - gameWon;
    const round1Win = await answer.countDocuments({
      $and: [{ Round: { $size: 1 } }, { gameWon: true }],
    });
    const round2Win = await answer.countDocuments({
      $and: [{ Round: { $size: 2 } }, { gameWon: true }],
    });
    const round3Win = await answer.countDocuments({
      $and: [{ Round: { $size: 3 } }, { gameWon: true }],
    });
    const round4Win = await answer.countDocuments({
      $and: [{ Round: { $size: 4 } }, { gameWon: true }],
    });
    const round5Win = await answer.countDocuments({
      $and: [{ Round: { $size: 5 } }, { gameWon: true }],
    });
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
      {
        roundWin: [
          {
            round1Win: round1Win,
          },
          {
            round2Win: round2Win,
          },
          {
            round3Win: round3Win,
          },
          {
            round4Win: round4Win,
          },
          {
            round5Win: round5Win,
          },
        ],
      },
    ];

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error);

    return new Response("Get req failed", { status: 500 });
  }
};
