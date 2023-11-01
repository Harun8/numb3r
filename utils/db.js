import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Numb3r",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("ERROR", error);
  }
};
