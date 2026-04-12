const mongoose = require("mongoose");
const seed = require("./seed");

if (process.env.NODE_ENV !== 'test' || process.env.DB_URL) {
  const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/tutorme";
  mongoose
    .connect(dbUrl)
    .then(async () => {
      console.log("Database Successfully connected");
      // Only seed if we're not in test mode to keep test DBs clean 
      // or if explicitly asked. 
      if (process.env.NODE_ENV !== 'test') {
        await seed();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
