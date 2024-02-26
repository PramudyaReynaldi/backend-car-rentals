import User from "../models/UserModel.js";

export const requireAuth = async (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: "Unauthorized", msg: "Mohon Login Terlebih Dahulu" });
        }
        const user = await User.findOne({
            where: {
                uuid: req.session.userId
            }
        });
        if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
        req.userId = user.id;
        req.role = user.role; 
        next();
    } catch (error) {
        console.error("Error in requireAuth middleware:", error);
        res.status(500).json({ error: "Internal Server Error", msg: "Terjadi kesalahan internal" });
    }
};