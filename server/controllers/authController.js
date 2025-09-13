import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

class AuthController {
    static userRegistration = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if (username && email && password) {
                const isUser = await authModel.findOne({ email: email });
                if (!isUser) {
                    //password hasing
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password, genSalt);

                    //savedUser
                    const newUser = new authModel({
                        username,
                        email,
                        password: hashedPassword,
                    });

                    const savedUser = await newUser.save();
                    if (savedUser) {
                        return res.status(200).json({ message: "User Registration Successfuly" });
                    }

                } else {
                    return res.status(400).json({ message: "Email Already Exits" });
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await authModel.findOne({ email: email });
                if (isEmail) {
                    if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {
                        //Generate Token
                        const token = jwt.sign({ userID: isEmail._id }, "pleaseSubscribe", {
                            expiresIn: "2d",
                        })
                        return res.status(200).json({ message: "Login Successfully", token, name: isEmail.username });
                    } else {
                        return res.status(400).json({ message: "Wrong Credentials" });
                    }
                } else {
                    return res.status(400).json({ message: "Email ID NOT Found" });
                }
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static forgetPassword = async (req, res) => {
        const { email } = req.body;

        try {
            // 1. Check if user exists
            const isUser = await authModel.findOne({ email: email });
            if (!isUser) {
                return res.status(400).json({ message: "User does not exist" });
            }

            // 2. Generate reset token
            const token = jwt.sign({ userID: isUser._id }, "pleaseSubscribe", {
                expiresIn: "15m", // short expiry for security
            });

            // 3. Create Nodemailer transporter (⚠️ use App Password instead of real Gmail password)
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "prabhatmunjal74@gmail.com", // replace with your Gmail
                    pass: "yitnfipzcxlegerq",   // generate App Password in Gmail settings
                },
            });

            // 4. Mail options
            let mailOptions = {
                from: "prabhatmunjal74@gmail.com",
                to: email, // send to user's email
                subject: "Reset your password",
                html: `
        <p>Hello ${isUser.username || "User"},</p>
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it (valid for 15 minutes):</p>
        <a href="http://localhost:3000/reset-password/${isUser._id}/${token}">
          Reset Password
        </a>
      `,
            };

            // 5. Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ message: "Error sending email" });
                } else {
                    console.log("Email sent: " + info.response);
                    return res.status(200).json({
                        message: "Password reset link sent to your email",
                        token, // optional: can remove if you don’t want to expose it
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

}

export default AuthController;


