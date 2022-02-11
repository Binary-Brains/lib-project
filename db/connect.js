const mongoose = require("mongoose");
const config = require("../config/config");

connectMongoDb();

var connectionAttempt = 0;

mongoose.connection.on("error", function (err) {
  console.trace("Mongodb connection failed ❌", err);
  if (connectionAttempt == config.DB_CONNECTION_RETTEMPT_LIMIT_NODE) {
    //send a mail to admin
    console.log("email has beeen sent");
  } else {
    connectionAttempt++;
    connectMongoDb();
  }
});

mongoose.connection.on("connected", function (success) {
  console.log("Successfully opened mongodb connection 👍🏻");
  connectionAttempt = 0;
});

function connectMongoDb() {
  console.log(config.MONGO_URL);
  mongoose.connect(
    config.MONGO_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Database successfully connected ✅");
    }
  );
}
