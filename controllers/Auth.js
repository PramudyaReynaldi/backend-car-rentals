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
    const user = await Users.findOne({
        where: {
            email: req.body.email,
            role: 'admin'
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({msg: "Incorrect Password"});

    req.session.isAdmin = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({uuid, name, email, role});
}

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
    if(!req.session.userId) return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    res.status(200).json(user);
}

export const MeAdmin = async (req, res) => {
    if(!req.session.isAdmin) return res.status(401).json({ msg: "Mohon Login Terlebih Dahulu" });
    const user = await Users.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.isAdmin
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    delete req.session.userId;
    res.status(200).json({msg: "Logged Out"});
}

export const logOutAdmin = (req, res) => {
    delete req.session.isAdmin;
    res.status(200).json({msg: "Logged Out"});
}