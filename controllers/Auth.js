import Users from "../models/UserModel.js";
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where: {
            email: req.body.email,
            role: 'user'
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});

    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Incorrect Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

export const LoginAdmin = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: {
                email: req.body.email,
                role: 'admin'
            }
        });
        if (!user) return res.render('auth.ejs', { message: 'User not found' });

        const match = await argon2.verify(user.password, req.body.password);
        if (!match) return res.status(400).json({ message: "Incorrect Password" });
        req.session.userId = user.uuid;
        
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: error.message });
    }
};

export const Register = async (req, res) => {
    const { name, email, password, confPassword, role } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Registration Successful"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const Me = async (req, res) => {
    if(!req.session.userId) return res.status(401).json({msg: "Mohon Login Terlebih Dahulu"});
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    res.status(200).json({ 
        userId: req.session.userId, 
        name: user.name,
        email: user.email,
        role: user.role,
        user
    });
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Failed to log out"});
    });
    res.status(200).json({msg: "Logged Out"});
}