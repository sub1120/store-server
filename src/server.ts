import app from "./app";
import CONFIG from "./config";
import connectToDB from "./config/db";

import "@/config/firebase";

// Handling uncaucght exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exceptions");
  process.exit(1);
});

const server = app.listen(CONFIG.PORT, async () => {
  try {
    await connectToDB();
    console.log(`App is listening at http://localhost:${CONFIG.PORT}`);
  } catch (error) {
    console.error(error);
  }
});

// log unhandled rejections
process.on("unhandledRejection", (err) => {
  console.error(err);
  console.log("Shutting down the server due to unhandled promise rejections");

  server.close(() => {
    process.exit(1);
  });
});
