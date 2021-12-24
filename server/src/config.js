require("dotenv").config();

module.exports = {
  MONGODB: process.env.MONGODB,
  SECRET_KEY: process.env.SECRET_KEY,
};
