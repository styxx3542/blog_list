const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware.js");
require("express-async-errors");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connecting to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;


// Here is a possible schema for a chess ladder manager web app with four entities and eight relationship sets:

// Player: stores information about each player in the ladder
// player_id (primary key)
// name
// email
// password
// elo
// Game: stores information about each game played in the ladder
// game_id (primary key)
// date
// winner_id (foreign key referencing Player.player_id)
// loser_id (foreign key referencing Player.player_id)
// Ladder: stores information about each ladder
// ladder_id (primary key)
// name
// LadderPlayer: stores information about each player in a ladder and their rank
// ladder_id (foreign key referencing Ladder.ladder_id)
// player_id (foreign key referencing Player.player_id)
// rank
// Relationship Sets:

// A Player can play in many games
// Player 1:M Game
// A Game has one winner and one loser
// Game M:1 Player (winner)
// Game M:1 Player (loser)
// A Ladder can have many players
// Ladder 1:M LadderPlayer
// Player 1:M LadderPlayer
// A LadderPlayer belongs to one Ladder and one Player
// LadderPlayer M:1 Ladder
// LadderPlayer M:1 Player
// A LadderPlayer has one rank
// LadderPlayer 1:1 LadderPlayer (previous rank)
// A LadderPlayer can have many previous ranks (history)
// LadderPlayer 1:M LadderPlayer (previous rank)
// A Game is played by two players
// Game 1:1 Player (winner)
// Game 1:1 Player (loser)
// A Game is played in one ladder
// Game 1:1 Ladder