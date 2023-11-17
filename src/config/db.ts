import mongoose from "mongoose";

import CONFIG from ".";

const connectToDB = async () => {
  try {
    const MONGO_URI = CONFIG.MONGO_URI;

    const conn = await mongoose.connect(MONGO_URI);

    if (conn) {
      console.log(`Connected to DB: ${conn.connection.host}`);
    }
  } catch (error) {
    process.exit(1);
  }
};

export default connectToDB;
