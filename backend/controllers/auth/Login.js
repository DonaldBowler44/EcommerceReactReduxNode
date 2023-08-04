const User = require("../../models/User");

const Login = async (req, res) => {
    const email = req.body.email
    // const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email, password: password });
        if (!user) {
            return res.status(401).json("Wrong credentials!");
        }
        
        // Assuming the email and password are stored in the user object
        // const { email, password } = user;

        // Generate JWT token
    // const token = jwt.sign(
    //     { userId: user._id },
    //      process.env.JWT_SECRET_KEY,
    //       { expiresIn: '24h' }
    //       );

        // Return the email and password with a 200 status code
        return res.status(200).json({
            userDetails: {
                userId: user._id,
                username: user.username,
                // token: token,
                email: user.email,
                password: user.password,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
};

module.exports = Login;