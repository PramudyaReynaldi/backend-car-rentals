import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId) return res.status(401).json({msg: "Mohon Login Terlebih Dahulu"});
    const user = await Users.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    req.user = user.id;
    req.role = user.role;
    next();
}