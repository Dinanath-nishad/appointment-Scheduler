const User = require('../models/userSchema');

// Controller function to handle user creation
exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email already exists" });
        }

        const newUser = new User({
            name,
            email,
            password,
        });

        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: "Server error", error });
    }
};
