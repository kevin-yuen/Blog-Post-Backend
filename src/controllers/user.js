const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async(req, res) => {
    const {username, password} = req.body;

    try {
        const exists = await User.findOne({username});

        if (exists) {
            return res.status(400).json({error: "Username already in use."});
        }

        // if username is not in use, hash password
        // the more times you hash, the slow it is, and the safer it is
        const hashedPassword = await bcrypt.hash(password, 10);     // .hash([the value you wanna hash], [the number of times to hash the value])
        const newUser = await User.create({
            username,
            password: hashedPassword
        });

        res.status(201).json({ newUser });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const loginUser = async(req, res) => {
    const {username, password} = req.body;

    try {
        const exists = await User.findOne({username});
        if (!exists) {
            return res.status(404).json({error: "Username not found."});
        }

        // .compare([the value to hash for comparing with the hashed value in DB], [the hashed value in DB])
        const isPasswordMatched = await bcrypt.compare(password, exists.password);
        if (!isPasswordMatched) {
            return res.status(400).json({error: "Incorrect password"});
        }

        // if password matches, create a token for the session
        const token = jwt.sign({userId: exists._id}, process.env.JWT_SECRET);   // create a token with user id and the secret key
        res.status(200).json({username, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    signupUser,
    loginUser
}