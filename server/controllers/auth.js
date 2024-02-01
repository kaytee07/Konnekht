import bcrypt from "bcrypt";
import jwt from "jwt";
import User from "../models/User.js"


/* REGISTER USER */

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email, 
            password,
            dateOfBirth,
            picturePath,
            location,
            occupation
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            dateOfBirth,
            picturePath,
            location,
            occupation,
            viewedProfile: 0,
            impressions: 0
        })
        const savedUser = newUser.save()
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};