const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

exports.registerController = async(req, res) => {

    try {
        if (!req.body.username || !req.body.email || !req.body.password) {
            return res
                .status(400)
                .send({success: false, message: "All fields are required"});
        }

        const existingUser = await User.findOne({email: req.body.email, username: req.body.username});
        if (existingUser) {
            return res
                .status(400)
                .send({success: false, message: "User with this email or username already exists"});
        }

        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({username: req.body.username, email: req.body.email, password: hashedPassword});

        const user = await newUser.save();

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res
            .status(200)
            .send({success: true, message: "User registered successfully", user, token});
    } catch (err) {
        console.error("Error registering user:", err);
        return res
            .status(500)
            .send({success: false, message: err.message});
    }
}

exports.loginController = async(req, res) => { 
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res
                .status(404)
                .send({success: false, message: "User not found"});
        }

        console.log(user.password);console.log(user);

        console.log(req.body.password);

        const validPassword = await bcrypt.compare(req.body.password,user.password,);
        console.log(validPassword);

        if (!validPassword) {
            return res
                .status(401)
                .send({success: false, message: "Wrong password"});
        }

        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET, {expiresIn: '1d'});

        res
            .status(200)
            .send({success: true, message: "Login successful", user, token});
    } catch (err) {
        console.error("Error logging in user:", err);
        res
            .status(500)
            .send({success: false, message: err.message});
    }
};

exports.changePasswordController = async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});

        if (!user) {
            return res
                .status(404)
                .send({success: false, message: "User not found"});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res
                .status(400)
                .send({success: false, message: "Current password is incorrect"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        return res
            .status(200)
            .send({success: true, message: "Password changed successfully"});
    } catch (err) {
        console.error("Error changing password:", err);
        return res
            .status(500)
            .send({success: false, message: err.message});
    }
};


exports.getUserDataController = async (req, res) => {
    try {
        const existingUser = await User.findById(req.body.userId).populate({
            path: 'friends',
            options: { strictPopulate: false }
          });;
        if (!existingUser) {
            return res.status(400).send({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "User data retrieved successfully",
            user: existingUser,
        });
    } catch (err) {
        console.error("Error retrieving user data:", err);
        return res.status(500).send({
            success: false,
            message: err.message,
        });
    }
};
