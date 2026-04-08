import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register — only allowed for admin email
export const register = async (req, res) => {
    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    const existing = await User.findOne({ email });

    if (existing) {
        return res.status(400).json({ message: "User already exists." });
    }
    if (email !== ADMIN_EMAIL)
    {
        return res.status(403).json({ message: "Registration not allowed." });
    }

    if (!email || !password) return res.status(400).json({ message: "Email and password are required." });


    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.json({ message: "Admin Registration successful." });
}

//Login — only allowed for admin email
export const login = async (req, res) => {
    const { email, password } = req.body;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (email !== ADMIN_EMAIL) return res.status(403).json({ message: "Access denied." });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Password." });

    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({ token, email: user.email });
};

//Change Password
export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) return res.status(400).json({ message: "All fields are required." });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ message: "Current password is incorrect." });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password changed successfully." });
};