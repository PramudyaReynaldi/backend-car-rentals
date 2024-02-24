export const requireAuth = (req, res, next) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ error: "Unauthorized", msg: "Mohon Login Terlebih Dahulu" });
        }
        next();
    } catch (error) {
        console.error("Error in requireAuth middleware:", error);
        res.status(500).json({ error: "Internal Server Error", msg: "Terjadi kesalahan internal" });
    }
};
