import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  const mongoURI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PROD
      : process.env.MONGO_URI;

  const dbname =
    process.env.NODE_ENV === "production" ? "ProdNumb3r" : "Numb3r";

  try {
    await mongoose.connect(process.env.MONGO_URI_PROD, {
      dbName: dbname,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("ERROR", error);
  }
};
