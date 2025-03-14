require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./app");

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Mongoose connection established.");
    const server = app.listen(3020, () => {
      console.log("Listening on http://localhost:3020");
    });
    server.on("error", (error) => {
      if (error.syscall !== "listen") {
        throw error;
      }
      switch (error.code) {
        case "EADDRINUSE":
          console.error("Port 3020 is already in use");
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  })
  .catch((error) => {
    console.error(
      "There was an error connecting the database to URI 3020",
      error
    );
  });
