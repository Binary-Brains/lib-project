let config = {
  MONGO_URL: process.env.MONOGO_URL || "mongodb://localhost:27017/libraryTestDb",
  MONGO_PORT: 27017,
  REDIS_PORT: 6379,
  TOKEN_EXPRIES_TIME: "7d",
  PASSWORD_HASH_LENGTH: 10,
  DB_CONNECTION_RETTEMPT_LIMIT_NODE: 3,
  RANDOM_NUMBER_LENGTH: 6,
  JWT_SECRET: process.env.JWT_SECRET || "library@#$$%%%%%((**(&8#HGEJ",
  GOOGLE_CLIENT_ID:
    process.env.GOOGLE_CLIENT_ID || "752429414290-obhkn6rnbuinkd8uqgesp8dst0503ja0.apps.googleusercontent.com",
  GOOGLE_SECRET: "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",
  GOOGLE_API_KEY: "AIzaSyAk3mWsgs0TwlSGqViakkYfGbIfv8S-Vdw",
};

module.exports = config;
