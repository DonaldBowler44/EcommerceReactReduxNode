const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const savedUser = await newUser.save();

        // Generate JWT token
    // const token = jwt.sign(
    //     { userId: savedUser._id },
    //      process.env.JWT_SECRET_KEY,
    //       { expiresIn: '24h' }
    //       );

        // res.status(201).json(savedUser);
        res.status(201).json({
            userDetails: {
                username: savedUser.username,
                // token: token,
                email: savedUser.email,
                password: savedUser.password,
            }
        })

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = register;