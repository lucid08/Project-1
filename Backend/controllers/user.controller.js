import User from "../models/user.model.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const register = async (req,res) => {
    try {
        
        const { name, email, password } = req.body;
        console.log(name, email, password);
        
        if(!name || !email || !password ) {
            return res.status(400).json({ 
                message: 'All fields are required', 
                success: false    
            });
        }
        

        const existingUser = await User.findOne({ email });     
        if(existingUser){
            return res.status(400).json({
                message: 'Email already exists',
                success: false
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            name, 
            email, 
            password: hashedPassword
        });
        return res.status(201).json({
            message: 'User registered successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Failed to register user',
            success: false
        })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email ||!password) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false
            });
        }
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false
            });
        }
        
        const tokenData = {
            userId: user._id,
        }
        // const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1d' });
        const token = jwt.sign(
            { id: user._id, email: user.email }, // Include the user ID in the payload
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
          );

        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
        }

        return res.status(200).cookie("token", token, {maxAge: 1 * 60 * 60 * 24 * 1000, httpsOnly: true, sameSite:'strict'}).json({
            message: `Welcome back ${user.name}`,
            user,
            token,
            success: true
        });

    }
    catch (error) {
        console.log(error.message);
    };
}