import Users from "../models/UserModel.js";

export const verifyUser = async (req, res, next) => {
    if(!req.session.isAdmin) return res.status(401).json({msg: "Mohon Login Terlebih Dahulu"});
    const user = await Users.findOne({
        where: {
            uuid: req.session.isAdmin
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    req.user = user.id;
    req.role = user.role;
    next();
}