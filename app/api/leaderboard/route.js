import answer from "@/models/gameAnswer";

import { connectDB } from "@/utils/db";
export const dynamic = "force-dynamic"; // vercel Bullshit static rendeirng

export const dynamic = 'force-dynamic';

export const GET = async (req, res) => {
  try {
    await connectDB();
    const response = await answer
      .find({})
      .sort({ timer: 1 })
      .where("name")
      .exists(true);

    return new Response(JSON.stringify(response), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Get req failed", { status: 500 });
  }
};
