require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");
const logger = require("./config/logger");

// Create Express app
const app = express();

// Middlewares
app.use(express.json());   // Parse JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded
// Optional: add cors, morgan, auth middleware
// app.use(cors());
// app.use(morgan("dev"));

// Example health route
app.get("/", (req, res) => {
    logger.info("Health check endpoint hit");
    res.send("Chronologi Trackr API running 🚀");
});

const routes = require("./routes");

// Use all routes under /api
app.use("/api", routes);

// Connect to MongoDB and start server
mongoose.connect(config.database.mongoUri)
    .then(() => {
        logger.info("MongoDB connected");
        app.listen(config.server.port, () => {
            logger.info(`Server running on port ${config.server.port}`);
        });
    })
    .catch(err => logger.error("DB connection error: %o", err));
