const { Router } = require("express");
const uroute = Router();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require("../db");
const userinputvalidator = require("../middlewares/userAuthenticate");
const user_middleware = require("../authentication/jwt_authentication");
const jwt_secret_token = process.env.REACT_JWT_KEY;

function user_is_there(req, res, next) {
    const username = req.body.username;
    User.findOne({ username: username }).then((value) => {
        if (value) {
            res.send("User already exists. Enter a new username and password.");
        } else {
            next();
        }
    });
}

async function userdbauthenitcate(username, password) {
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return {
                res: false,
                message: "User not found",
                error: null
            };
        } else {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            return {
                res: isPasswordValid,
                message: isPasswordValid ? "User found" : "Password incorrect",
                error: null
            };
        }
    } catch (err) {
        return {
            res: false,
            message: "An error occurred while trying to authenticate the user",
            error: err
        };
    }
}

uroute.get("/user", (req, res) => {
    res.send("Welcome new user");
});

uroute.post("/signup", userinputvalidator, user_is_there, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await User.create({ username: username, password: hashedPassword });
        const jtoken = jwt.sign({ username: username }, jwt_secret_token, { expiresIn: '10d' });
        res.status(200).json({ token: jtoken });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

uroute.post("/login", userinputvalidator, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const result = await userdbauthenitcate(username, password);
        if (!result.res && result.error == null) {
            throw new Error(result.error);
        }
        if (result.res) {
            const jtoken = jwt.sign({ username: username }, jwt_secret_token, { expiresIn: '10d' });
            res.status(200).json({
                message: "Logged in successfully",
                jwt_token: jtoken,
            });
        } else {
            res.status(404).send("User not found");
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

uroute.get("/login", async (req, res) => {
    const token = req.headers.authorization;
    const jwt_token = token.split(" ")[1];
    try {
        const decoded = jwt.verify(jwt_token, jwt_secret_token);
        if (decoded.username) {
            const value = await User.findOne({ username: decoded.username });
            if (value) {
                res.status(200).json({
                    isregistered: true,
                    message: "User is registered"
                });
            } else {
                res.status(403).json({
                    isregistered: false,
                    message: "User is not logged in"
                });
            }
        } else {
            res.status(403).json({
                isregistered: false,
                message: "User is not logged in"
            });
        }
    } catch (err) {
        res.json({
            error: err,
            msg: "Invalid input"
        });
    }
});

uroute.get("/profile", user_middleware, (req, res) => {
    const token = req.headers.authorization;
    const token_word = token.split(" ")[1];
    try {
        const decoded = jwt.verify(token_word, jwt_secret_token);
        User.findOne({ username: decoded.username }).then((value) => {
            if (!value) {
                return res.status(404).json({ message: "User not found." });
            }
            res.json({
                todos: value.todos,
                username: decoded.username
            });
        });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

uroute.post("/profile", user_middleware, async (req, res) => {
    const { new_array, username } = req.body;
    try {
        if (!Array.isArray(new_array)) {
            return res.status(400).json({ message: "Input should be an array." });
        }

        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: { todos: new_array } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).send("User not found for updating.");
        }
        res.json({ todos: updatedUser.todos });
    } catch (err) {
        res.status(500).json({ message: "Could not modify the todo." });
    }
});

module.exports = uroute;
