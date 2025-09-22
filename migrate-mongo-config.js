// require("dotenv").config();

// module.exports = {
//     mongodb: {
//         url: process.env.MONGO_URI,
//         databaseName: "chronologi-trackr",

//         options: {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     },

//     migrationsDir: "migrations",
//     changelogCollectionName: "migrations_changelog"
// };

// migrate-mongo-config.js
module.exports = {
    mongodb: {
        url: "mongodb://localhost:27017",
        databaseName: "chronologi-trackr",
        options: {} // remove useNewUrlParser and useUnifiedTopology
    },
    migrationsDir: "migrations",
    changelogCollectionName: "migrations_changelog"
};
