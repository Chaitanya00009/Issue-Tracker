const mongoose = require("mongoose");

// const url = "mongodb://localhost:27017/issueTracker";
const url =
  "mongodb+srv://admin:admin2026@testcluster.vovde39.mongodb.net/issueTracker?appName=TestCluster";
async function connectDB() {
  try {
    await mongoose.connect(url);
    console.log("The db is connectedddddd");
  } catch (err) {
    throw err;
  }
}

module.exports = connectDB;
