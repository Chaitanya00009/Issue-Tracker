const express = require("express");
const routes = require("./routes/issue.routes"); //To import the routes from router file
const server = express();
const dbConnection = require("./config/db.js");
const logger = require("./middleware/logger.js");

//To parse the Json
server.use(express.json());

//To fetch the post data

server.use(logger);
server.use("/issues", routes);

// server.get("/", (req, res) => {
//   res.send("Server Running now!");
// });

// server.listen(5000, () => {
//   console.log("The server is up and running on 5000 port");
// });

async function startServer() {
  try {
    await dbConnection();
    server.listen(5000, () => {
      console.log("The server is up and running on 5000 port");
    });
  } catch (err) {
    console.log("Db connection failed", err);
    process.exit(1);
  }
}

startServer();
