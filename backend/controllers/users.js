const userRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res) => {
    const { username, name, password } = req.body;
    if (!(name && password))
        res.status(400).send({
            error: "Please enter username and password",
        });
    else if (!(username.length > 2 && password.length > 2)) {
        res.status(400).send({
            error: "username and password must be atleast 3 character long",
        });
    } else {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            passwordHash,
            name,
        });

        const savedUser = await user.save();
        res.status(201).json(savedUser);
    }
});

userRouter.get("/", async (req, res) => {
    const users = await User.find({}).populate("blogs");
    res.json(users);
});
module.exports = userRouter;
