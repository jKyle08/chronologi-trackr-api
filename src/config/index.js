require("dotenv").config(); // load .env

const config = {
    server: {
        port: process.env.PORT || 5000,
        nodeEnv: process.env.NODE_ENV || "development",
    },

    database: {
        mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/chronologi-trackr",
    },

    auth: {
        jwtSecret: process.env.JWT_SECRET || "changeme123",
    },

    logging: {
        level: process.env.LOG_LEVEL || "info",
        toFile: process.env.LOG_TO_FILE === "true" ? true : false,
    },
};

module.exports = config;
