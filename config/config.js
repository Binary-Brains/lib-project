let config = {
  MONGO_URL: "mongodb://localhost:27017/libraryTestDb",
  MONGO_PORT: 27017,
  REDIS_PORT: 6379,
  TOKEN_EXPRIES_TIME: "7d",
  PASSWORD_HASH_LENGTH: 10,
  DB_CONNECTION_RETTEMPT_LIMIT_NODE: 3,
  RANDOM_NUMBER_LENGTH: 6,
};

module.exports = config;
